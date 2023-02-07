import express from "express";
import setEmail, {
  getEmail,
  updateEmail,
  deleteEmail,
  getAllEmail,
  deleteAll
} from "../controller/emailController.js";

const router = express.Router();

router.get("/get-all-emails", getAllEmail);
router.post("/create", setEmail);
router.delete("/delete-All", deleteAll);
router.get("/get-email/:id", getEmail);
router.put("/update/:id", updateEmail);
router.delete("/delete/:id", deleteEmail);
export default router;
