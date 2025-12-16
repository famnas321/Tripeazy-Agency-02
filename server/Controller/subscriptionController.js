const Stripe = require("stripe");
const AgencyModel = require("../model/AgencyModel")
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


exports.subscription = async (req,res) =>{
try {

    // const { agencyId } = req.body;
    const {amount }= req.body
    const agencyId= req.user.id
    console.log(amount.userId)
     const checkSubscription = await AgencyModel.findOne({
  _id: agencyId,
  subscriptionStatus: "active",
});
   if(checkSubscription){
        res.status(409).json({message:" you have active subscription"})
        return 
   }
    const paymentIntent = await stripe.paymentIntents.create({
      amount , 
      currency: "inr",
      metadata: {
        agencyId, 
        plan: "3-month-subscription"
      },
    });
    
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "PaymentIntent creation failed" });
  }
}

exports.addsubscriptionStatus = async (req,res)=>{
  const agencyId= req.user.id
 const {subscriptionPlan,subscriptionStatus,expiresAt} =req.body
//  console.log(plan,status,expiresAt,"this is plan ")
 try{
  const response = await AgencyModel.findByIdAndUpdate(
    agencyId,
    {subscriptionPlan,subscriptionStatus,expiresAt}

  )
  res.status(200).json({message:"subsctiption acticated and updated in db",response})

 }catch(error){
 console.log(error)
 res.status(500).json({error:"error occured while payment update to db ",error})
 }
}