const checkMillionDollarIdea = (req, res, next) => {
        const numWeeks = Number(req.body.numWeeks);
        const weeklyRevenue = Number(req.body.weeklyRevenue);
        const totalRevenue = numWeeks * weeklyRevenue;
        if (!numWeeks || !weeklyRevenue || isNaN(totalRevenue) || totalRevenue < 1000000) {
        res.status(400).send();
        } else {
        next();
        }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
