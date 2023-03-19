const Contacts = require('../models/contacts');

module.exports = {
    add : ( req, res, next ) => {
        var userId = req.userId;
        var contactId = req.body.contactId;
        var contact = new Contacts({userId , contactId});
        contact.save((err)=>{
            if(err) return res.send({status:false,message:"data base error"});
        })
    },
    remove : ( req, res, next ) => {
        var userId = req.userId;
        var contactId = req.body.contactId;
        
        Contacts.findOneAndRemove({userId , contactId},(err,result)=>{
            if(err) return res.send({status:false,message:"data base error"});
            if(!result) return res.send({status:true,message:"contact not exists!"})

            res.send({message:"contact removed"})
        })
    },
    myContacts : ( req, res, next ) => {
        var userId = req.userId;
      
        Contacts.find({userId},(err,result)=>{
            if(err) return res.send({status:false,message:"data base error"});
            res.send({status:true,contacts:result})
        })
    },
    UpdateMyContact : ( req, res, next ) => {
        Contacts.updateMany({ userId:req.userId }, { $set: {name:"ehsan"} })
        .then((result) => {
          // The `result` variable contains the number of documents that were updated
          res.send(`Updated ${result.nModified} UserContact documents successfully`);
          // Add any other code that you want to execute after updating the UserContact documents
        })
        .catch((error) => {
          res.send('Error while updating UserContact documents:', error);
          // Add any error handling code here
        });
        
    }
};