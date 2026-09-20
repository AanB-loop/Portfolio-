import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method not allowed',
    })
  }

  try {
    const { name, email, type, message } = req.body

    if (!name || !email || !type || !message) {
      return res.status(400).json({
        message: 'Please fill in all fields.',
      })
    }

    const { data, error } = await resend.emails.send({
      from: 'COMPASS <onboarding@resend.dev>',
      to: ['aanbgodwin@gmail.com'],
      replyTo: email,
      subject: `New COMPASS Enquiry — ${type}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #111;">
          <h2>New COMPASS Project Enquiry</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Project Type:</strong> ${type}</p>

          <hr style="margin: 24px 0;" />

          <h3>Project Description</h3>
          <p style="white-space: pre-line;">${message}</p>
        </div>
      `,
    })

    if (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Failed to send email.',
      })
    }

    return res.status(200).json({
      message: 'Message sent successfully!',
      data,
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Something went wrong.',
    })
  }
}