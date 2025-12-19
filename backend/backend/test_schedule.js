const axios = require('axios');

async function test() {
    try {
        const payload = {
            applicationId: '6943887078293f6a582d1753',
            stage: 'department_interview',
            scheduledDate: '2025-12-25T10:00:00Z',
            method: 'video',
            panel: ['507f1f77bcf86cd799439013'],
            videoLink: 'https://meet.google.com/abc-def'
        };

        console.log('Sending payload:', JSON.stringify(payload, null, 2));
        const res = await axios.post('http://localhost:9000/recruitment/interviews', payload);
        console.log('Success:', res.data);
    } catch (err) {
        console.error('Error Status:', err.response?.status);
        console.error('Error Data:', JSON.stringify(err.response?.data, null, 2));
    }
}

test();
