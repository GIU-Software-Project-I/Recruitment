import path from 'path';
import mongoose from 'mongoose';
import fs from 'fs';
import dotenv from 'dotenv';

// Load .env from backend folder
dotenv.config({ path: path.resolve(__dirname, '../../..', '.env') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI not set. Copy .env.example -> .env and set MONGODB_URI');
  process.exit(1);
}

type AnyDoc = { [k: string]: any };

async function run(): Promise<void> {
  await mongoose.connect(MONGODB_URI as string, { family: 4 });
  console.log('Connected to MongoDB');

  const dataPath = path.join(__dirname, 'querydata.json');
  if (!fs.existsSync(dataPath)) {
    console.error('querydata.json not found at', dataPath);
    process.exit(1);
  }

  const raw = fs.readFileSync(dataPath, 'utf8');
  const data = JSON.parse(raw) as AnyDoc;

  const placeholders = new Map<string, mongoose.Types.ObjectId>();
  const makeId = (key: string) => {
    if (!placeholders.has(key)) placeholders.set(key, new mongoose.Types.ObjectId());
    return placeholders.get(key)!;
  };

  const mapIdOrKeep = (v: any) => (typeof v === 'string' ? makeId(v) : v);

  const mapJob = (doc: AnyDoc) => {
    if (typeof doc._id === 'string') doc._id = makeId(doc._id);
    if (typeof doc.department === 'string') doc.department = makeId(doc.department);
    if (typeof doc.postedBy === 'string') doc.postedBy = makeId(doc.postedBy);
    if (typeof doc.createdBy === 'string') doc.createdBy = makeId(doc.createdBy);
    if (typeof doc.hiringProcessTemplate === 'string') doc.hiringProcessTemplate = makeId(doc.hiringProcessTemplate);
    return doc;
  };

  const mapHpt = (doc: AnyDoc) => {
    if (typeof doc._id === 'string') doc._id = makeId(doc._id);
    return doc;
  };

  const mapAst = (doc: AnyDoc) => {
    if (typeof doc._id === 'string') doc._id = makeId(doc._id);
    return doc;
  };

  const mapApp = (doc: AnyDoc) => {
    if (typeof doc._id === 'string') doc._id = makeId(doc._id);
    if (typeof doc.job === 'string') doc.job = makeId(doc.job);
    if (typeof doc.candidate === 'string') doc.candidate = makeId(doc.candidate);
    if (Array.isArray(doc.statusHistory)) {
      doc.statusHistory = doc.statusHistory.map((s: AnyDoc) => ({
        ...s,
        changedBy: typeof s.changedBy === 'string' ? makeId(s.changedBy) : s.changedBy,
      }));
    }
    if (typeof doc.lastUpdatedBy === 'string') doc.lastUpdatedBy = makeId(doc.lastUpdatedBy);
    if (Array.isArray(doc.assessmentScores)) {
      doc.assessmentScores = doc.assessmentScores.map((a: AnyDoc) => ({ ...a, template: typeof a.template === 'string' ? makeId(a.template) : a.template }));
    }
    return doc;
  };

  const mapInterview = (doc: AnyDoc) => {
    if (typeof doc._id === 'string') doc._id = makeId(doc._id);
    if (typeof doc.application === 'string') doc.application = makeId(doc.application);
    if (Array.isArray(doc.panelMembers)) doc.panelMembers = doc.panelMembers.map((m: any) => (typeof m === 'string' ? makeId(m) : m));
    return doc;
  };

  const mapOffer = (doc: AnyDoc) => {
    if (typeof doc._id === 'string') doc._id = makeId(doc._id);
    if (typeof doc.application === 'string') doc.application = makeId(doc.application);
    if (typeof doc.issuedBy === 'string') doc.issuedBy = makeId(doc.issuedBy);
    if (Array.isArray(doc.approvals)) doc.approvals = doc.approvals.map((a: AnyDoc) => ({ ...a, approver: typeof a.approver === 'string' ? makeId(a.approver) : a.approver }));
    return doc;
  };

  try {
    if (Array.isArray(data.hiringProcessTemplates) && data.hiringProcessTemplates.length) {
      const docs = data.hiringProcessTemplates.map(mapHpt);
      await mongoose.connection.collection('hiringprocesstemplates').insertMany(docs, { ordered: false });
      console.log('Inserted hiringProcessTemplates:', docs.length);
    }

    if (Array.isArray(data.assessmentTemplates) && data.assessmentTemplates.length) {
      const docs = data.assessmentTemplates.map(mapAst);
      await mongoose.connection.collection('assessmenttemplates').insertMany(docs, { ordered: false });
      console.log('Inserted assessmentTemplates:', docs.length);
    }

    if (Array.isArray(data.jobRequisitions) && data.jobRequisitions.length) {
      const docs = data.jobRequisitions.map(mapJob);
      await mongoose.connection.collection('jobrequisitions').insertMany(docs, { ordered: false });
      console.log('Inserted jobRequisitions:', docs.length);
    }

    if (Array.isArray(data.applications) && data.applications.length) {
      const docs = data.applications.map(mapApp);
      await mongoose.connection.collection('applications').insertMany(docs, { ordered: false });
      console.log('Inserted applications:', docs.length);
    }

    if (Array.isArray(data.interviews) && data.interviews.length) {
      const docs = data.interviews.map(mapInterview);
      await mongoose.connection.collection('interviews').insertMany(docs, { ordered: false });
      console.log('Inserted interviews:', docs.length);
    }

    if (Array.isArray(data.offers) && data.offers.length) {
      const docs = data.offers.map(mapOffer);
      await mongoose.connection.collection('offers').insertMany(docs, { ordered: false });
      console.log('Inserted offers:', docs.length);
    }

    console.log('Placeholder to ObjectId mapping:');
    placeholders.forEach((v, k) => console.log(k, '->', v.toHexString()));
  } catch (err: any) {
    console.error('Error inserting seed data:', err.message || err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
