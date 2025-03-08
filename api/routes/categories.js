var express = require('express');
//const { route } = require('./auditlogs');
var router = express.Router();
const Categories = require('../db/models/Categories');
const Response = require('../lib/Response');
const CustomError = require('../lib/Error');
const Enum = require("../config/Enum");
const AuditLogs = require('../lib/AuditLogs');
const logger = require("../lib/logger/loggerClass")
// CRUD EXAMPLE




/* GET categories listing. */
router.get('/', async(req, res, next) => {
  try {
    let categories = await Categories.find({});
    res.json(Response.successResponse(categories));

  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
});

router.post('/add', async(req, res, next) => {
  let body = req.body;
  try {
    if(!body.name) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error!", "name fields must be filled");
    {

      let category = new Categories({
        name: body.name,
        is_active: true,
        created_by: req.user?._id
      });
      await category.save();
      AuditLogs.info(req.user?.email, "Categories", "Add", `Category ${category.name} added`);
      logger.info(req.user?.email, "Categories", "Add", category);

      res.json(Response.successResponse(category, Enum.HTTP_CODES.CREATED));

    }

  } catch (err) {
    logger.error(req.user?.email, "Categories", "Add", err)
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
}
);

router.post("/update", async(req, res, next) => {
  let body = req.body;
  try {

    if(!body._id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error!", "_id field must be filled");
    //if(!body.name) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error!", "name field must be filled");

    let updates = {};

    if(body.name) updates.name = body.name;
    if(typeof body.is_active === "boolean") updates.is_active = body.is_active;

    // Eger ki burada bu _id bulunamadı hatası almana ragmen update islemini yapıyor ise yernleştirmeyi bu sirada yap
    AuditLogs.info(req.user?.email, "Categories", "Update", {_id: body._id, ...updates});
    await Categories.updateMany({_id: body._id}, updates);


    res.json(Response.successResponse({success: true}));
  }
    catch(err){
      let errorResponse = Response.errorResponse(err);
      res.status(errorResponse.code).json(errorResponse);
    }
});

router.post("/delete", async(req, res) => {
  let body = req.body;
  try {
    if(!body._id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error!", "_id field must be filled");
    
    AuditLogs.info(req.user?.email, "categories", "Delete", {_id: body._id});
    await Categories.deleteOne({_id: body._id});


    res.json(Response.successResponse({success: true}));
  }
  catch(err){
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
}
);


module.exports = router;