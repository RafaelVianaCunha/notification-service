import AWS from 'aws-sdk';

const ses = new AWS.SES({ region: 'us-east-1' });

async function sendMail(event, context) {
  const record = event.Records[0];
  console.log(`Record processing ID: ${record}`);

  const email = JSON.parse(record.body);
  const {subject, body, recipient} = email;
  
  const params = {
    Source: "rafaelvianacunha@outlook.com",
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Text: {
          Data: body
        },
      }
    }
  };
  console.log(params);
  try {
    const response = await ses.sendEmail(params).promise();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}


export const handler = sendMail;


