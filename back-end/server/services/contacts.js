
const Contacts = require('../models/contacts');

module.exports = {
    add : async ( req, res, next ) => {
        const userId = req.userId;
        const contactId = req.body.contactId;
        
        await Contacts.create({userId, contactId})
        .catch(() => {
            return res.send( {status:false, message:"database error" });
        })
    },

    remove : ( req, res, next ) => {
        const userId = req.userId;
        const contactId = req.body.contactId;
        
        Contacts.findOneAndRemove({userId , contactId},(err,result)=>{
            if (err) return res.send({ status:false, message:"database error" });
            if (!result) return res.send({ status:true, message:"contact does not exist!" })

            res.send({message:"contact removed"})
        })
    },

    myContacts : ( req, res, next ) => {
        const userId = req.userId;
      
        Contacts.find({userId}, (err, result)=>{
            if (err) return res.send({ status:false, message:"database error" });
            res.send({ status:true, contacts:result })
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