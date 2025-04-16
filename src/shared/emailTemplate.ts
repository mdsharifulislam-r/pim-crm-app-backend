import { ICreateAccount, IResetPassword, IAddTeamMember } from '../types/emailTemplate';

const createAccount = (values: ICreateAccount) => {
    const data = {
        to: values.email,
        subject: 'Verify your account',
        html: `
            <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 50px; padding: 20px; color: #555;">
                <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    
                    <!-- Logo -->
                    <img src="https://res.cloudinary.com/ddqovbzxy/image/upload/v1737276027/pim_wxwhiv.png" alt="PIM Logo" style="display: block; margin: 0 auto 20px; width:150px" />

                    <!-- Greeting -->
                    <h2 style="color: #D0A933; font-size: 24px; margin-bottom: 20px;">Hey, ${values.name}!</h2>

                    <!-- Verification Instructions -->
                    <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Thank you for signing up for PIM. Please verify your email address to activate your account.</p>

                    <!-- OTP Section -->
                    <div style="text-align: center;">
                        <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Your single use code is:</p>
                        <div style="background-color: #D0A933; width: 120px; padding: 10px; text-align: center; border-radius: 8px; color: #fff; font-size: 25px; letter-spacing: 2px; margin: 20px auto;">${values.otp}</div>
                        <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">This code is valid for 3 minutes.</p>
                    </div>

                    <!-- Footer -->
                    <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">If you did not sign up for PIM, please ignore this email.</p>
                    <p style="color: #999; font-size: 12px; text-align: center;">&copy; 2024 PIM. All rights reserved.</p>

                </div>
            </body>
        `
    }

    return data;
}

const addTeamMember = (values: IAddTeamMember) => {
    const data = {
        to: values.email,
        subject: '🎉 Welcome to the Team!',
        html: `
        <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 50px; padding: 20px; color: #555;">
          <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
  
            <!-- Logo -->
            <img src="https://res.cloudinary.com/ddqovbzxy/image/upload/v1737276027/pim_wxwhiv.png" alt="PIM Logo" style="display: block; margin: 0 auto 20px; width:150px" />
  
            <!-- Greeting -->
            <h2 style="color: #28a745; font-size: 24px; margin-bottom: 20px;">Congratulations, ${values.name}!</h2>
  
            <!-- Message -->
            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
              You've been successfully added to the PIM team. We’re excited to have you on board!
            </p>
  
            <!-- Credentials Section -->
            <div style="background-color: #f1f1f1; padding: 15px 20px; border-radius: 8px; margin-bottom: 20px;">
              <p><strong>Email:</strong> ${values.email}</p>
              <p><strong>Temporary Password:</strong> ${values.password}</p>
              <p><strong>Assigned Permissions:</strong></p>
              <ul style="margin-left: 20px; color: #333;">
                ${values.permissions.map((perm) => `<li>${perm}</li>`)}
              </ul>
            </div>
  
            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
              Please log in and change your password as soon as possible. If you have any questions, feel free to reach out.
            </p>
  
            <!-- Footer -->
            <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">Welcome aboard once again!</p>
            <p style="color: #999; font-size: 12px; text-align: center;">&copy; 2024 PIM. All rights reserved.</p>
  
          </div>
        </body>
      `
    };

    return data;
};



const resetPassword = (values: IResetPassword) => {
    const data = {
        to: values.email,
        subject: 'Reset your password',
        html: `
            <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 50px; padding: 20px; color: #555;">
                <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    <img src="https://res.cloudinary.com/ddqovbzxy/image/upload/v1737276027/pim_wxwhiv.png" alt="Logo" style="display: block; margin: 0 auto 20px; width:150px" />
                    <div style="text-align: center;">
                        <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Your single use code is:</p>
                        <div style="background-color: #277E16; width: 120px; padding: 10px; text-align: center; border-radius: 8px; color: #fff; font-size: 25px; letter-spacing: 2px; margin: 20px auto;">${values.otp}</div>
                        <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">This code is valid for 3 minutes.</p>
                    </div>
                </div>
            </body>
        `,
    };
    return data;
};

export const emailTemplate = {
    createAccount,
    resetPassword,
    addTeamMember,
};