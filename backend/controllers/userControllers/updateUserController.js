import userModel from "../../models/userModel.js";

const updateUserController = async (req, res) => {
  const { id } = req.params;
  const { newname, newphone, newaddress } = req.body;
  const user = await userModel.findByIdAndUpdate(id, {
    name: newname,
    phone: newphone,
    address: newaddress,
  });
  if (user) {
    res.status(201).send({
      success: true,
      message: "Updated Successfully",
      user,
    });
  }
};
export default updateUserController;
