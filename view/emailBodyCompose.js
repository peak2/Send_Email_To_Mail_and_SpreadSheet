export const emailHtml = () => {
  let response = `
    <div style="max-width:600px; margin:auto; border:10px solid #ddd; padding:30px 20px; font-size:110%;">
    <div style="max-width:500px; height: 50px; color: white; margin:auto; border:1px solid #0f0; background-color:dodgerblue; padding:5px 25px; text-align:left; font-family: Tahoma">
        <h3 style="text-align:center; text-transform: uppercase; color:white"> Welcome To Errand Joe Community </h3>
    </div>
    <hr>
    
    
    <p>Dear User,</p>

   <p> We're thrilled to have you join our community! Our goal is to provide valuable information and resources that will 
       help you achieve your goals and make the most of your membership.</p>

    <p>If you have any questions or need help getting started, feel free to reach out to us. Our team is here to support you 
       every step of the way.</p>

    <p>Thanks for choosing us, and we look forward to serving you.</p>

    <p>Best regards,</p>
    <p>Errand Joe!!!</p>

    
    </div>
    `;
  return response;
};
