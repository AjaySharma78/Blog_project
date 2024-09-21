import { Resend } from 'resend';

import React, { useEffect } from 'react'

function Mail() {
    useEffect(() => {
const resend = new Resend('re_cZSefiQ8_5V1S1eEtYZmGGKyzZtEXyGmM');

resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'sharma321santoshi@gmail.com',
    subject: 'Hello World',
    html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});

    }, [])

  return (
    <div>
      hello
    </div>
  )
}

export default Mail;
