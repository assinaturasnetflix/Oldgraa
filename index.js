// backend.js
import express from 'express';
import fetch from 'node-fetch'; // Se usar Node >=18 pode usar fetch nativo
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const VM_API_URL = 'https://api.sandbox.vm.co.mz:18352/ipg/v1x/c2bPayment/singleStage/';
const AUTH_TOKEN = 'Bearer AUFthdlnDjWcKcVRCHSdDXkcp+oJ4eAVd0GBFC7pS2Nhc7VJ2++PTvDXqBtiS3JPso3hoRWyxDgNMgs5HStWuMrWtVwJRCK55LoUhWTnTZ8iXgVaVTVJyPlbtpO5CHC5TDquALQ+EDZiihqkX6Qa3Q2SSUAPBo9ZM8CHgxnTro2dOypQVdD74t1eNYAHudWlS2NhcZJmtpFcVtLuyH6Rcumui3K9d5qEpDyZfBY03R4qcMbia26Zc8l3Ilz+rkfcK9eL0epwyXt5LOb6RiA+JOf5CImSq79QyKYm2KOTihBaDh+KDMlG9ffRHH+t37Sei8WZGxBii259FFjFXPbmM7a5/5wU1OQIO41efqIofTGBtFXmf58vxCrj1IcUVjpmZPXcz2zLHrY9bowPe3IUvdtPWzTGeuTeTr3kYeYgtkc5Bh1xDGp+yMlf/XBPas50hzzF36hggr7hGJXDJp0rXgviRsSGI8ZAIsKTHF3scguz0DyY2AH+GWgQYDSvfrDIlD7hppRyBsOhdCbqeTP55FmeFXxrxYQaV8h23mkgJmZy2FcoOKBi5oa5ijBN9DJktM6oCdTaoYY/ooN4QYdhSKvwN2vUETXctKelpFBYgMrhuRcRbbT21T7ujBkcNi59X0UN7gm7ox9h+ROV8XyqAdyYCsONh52VhxQ7zJwQmrM=';

app.post('/checkout', async (req, res) => {
  try {
    const {
      input_TransactionReference,
      input_CustomerMSISDN,
      input_Amount,
      input_ThirdPartyReference,
      input_ServiceProviderCode,
    } = req.body;

    if (
      !input_TransactionReference ||
      !input_CustomerMSISDN ||
      !input_Amount ||
      !input_ThirdPartyReference ||
      !input_ServiceProviderCode
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const response = await fetch(VM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: AUTH_TOKEN,
        Origin: 'developer.mpesa.vm.co.mz',
      },
      body: JSON.stringify({
        input_TransactionReference,
        input_CustomerMSISDN,
        input_Amount,
        input_ThirdPartyReference,
        input_ServiceProviderCode,
      }),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Checkout error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
