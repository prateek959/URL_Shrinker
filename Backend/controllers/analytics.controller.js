import { Analytics } from "../models/analytics.model.js";
import { User } from "../models/user.model.js";

const getAnalytics = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ msg: "Unauthorized Access" });
        }

        const user = await User.findOne({ _id: req.user._id }).populate("urls");
        const userUrlIds = user.urls.map(url => url._id);
        const data = await Analytics.find({ urlId: { $in: userUrlIds } }).populate("urlId");
        
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        // console.log(data);
        res.status(200).json({data });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ msg: error.message });
    }
};



export {getAnalytics};