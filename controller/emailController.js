import { mailSent, FromAdminMail, userSubject } from "../utils/notification.js";
import { emailHtml } from "../view/emailBodyCompose.js";
import Email from "../model/emailModel.js";
import { google } from "googleapis";
//import { GoogleSpreadsheet } from 'google-spreadsheet';

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const client = auth.getClient();
const spreadsheetId = "1WKUGarieEAMdMvv5BIUI0EpNhMlWD-mHJqlyEc_mTrs";
const googleSheets = google.sheets({
  version: "v4",
  auth: client,
});

/** ========================= CREATE EMAIL ========================= */

const setEmail = async (req, res) => {
  const { email } = req.body;

  try {

    const User = await Email.findOne({ email: email });
    
    if (!User) {
      const user = await Email.create(req.body);
      const createSpreadsheet = await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:B",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[user._id, user.email]],
        },
      });
      console.log("createSpreadsheet is ", createSpreadsheet);

      const html = emailHtml();
      await mailSent(FromAdminMail, email, userSubject, html);
      return res.status(201).json({
        message: "Email Successfully Created",
        user,
      });
    }

    return res.status(400).json({
      Error: "User already exist",
    });

  } catch (err) {
    console.error(err);
    return res.status(err.statusCode || 500).json({
      Error: "Internal Server error occured",
      route: "/email/create",
    });
  }
};

/** ========================= RETURN SINGLE EMAIL ========================= */

export const getEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const email = await Email.findOne({ _id: id });
    if (!email) {
      return res.status(404).json({
        message: `No Email with id: ${id} found`,
      });
    }
    res.status(200).json({
      message: "Email retrieved successfully",
      email,
    });
  } catch (err) {
    return res.status(500).json({
      Error: "Internal Server error occured",
      route: "/email/get-email/:id",
    });
  }
};

/** ========================= RETURN ALL EMAIL ========================= */

export const getAllEmail = async (req, res) => {
  try {
    const emails = await Email.find({});
    res.status(200).json({
      message: "You have successfully retrieved all emails",
      emails,
    });
  } catch (err) {
    return res.status(500).json({
      Error: "Internal Server error occured",
      route: "/email/get-all-emails",
    });
  }
};

/** ========================= UPDATE EMAIL ========================= */

export const updateEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const email = await Email.findByIdAndUpdate(
      id,
      { ...req.body },
      {
        new: true,
      }
    );
    if (!email) {
      return res.status(404).json({
        message: `No email with id: ${id} found`,
      });
    }
    res.status(200).json({
      message: "Email updated successfully",
      email,
    });
  } catch (err) {
    return res.status(500).json({
      Error: "Internal Server error occured",
      route: "/email/update/:id",
    });
  }
};

/** ========================= DELETE EMAIL ========================= */

export const deleteEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const email = await Email.findByIdAndDelete(id);

    if (!email) {
      return res.status(404).json({
        message: `No email with id: ${id}`,
      });
    }
    res.status(200).json({
      message: "Email deleted successfully",
      email,
    });
  } catch (err) {
    return res.status(500).json({
      Error: "Internal Server error occured",
      route: "/email/delete/:id",
    });
  }
};

export default setEmail;



/**========================delete all=====================*/

export const deleteAll = async (req, res) => {
    try {
      const result = await Email.deleteMany({});
      console.log(result);
      res.status(200).json({
        message: "All Emails deleted successfully",
        result,
      });
    } catch (err) {
        return res.status(500).json({
            Error: "Internal Server error occured",
            route: "/email/delete-All",
        });
    }
  };
  