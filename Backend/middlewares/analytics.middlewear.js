import { Analytics } from "../models/analytics.model.js";
import { Url } from "../models/url.model.js";

const analytics = async (req, res, next) => {
  try {
    const urlId = req.params.code;
    console.log(urlId);
    const browser = req.headers["user-agent"];

    const url = await Url.findOne({ code: urlId });
    if (!url) {
      return res.status(404).json({ msg: "Url not found" });
    }
    
    const getAnalytics = await Analytics.findOne({ urlId:url._id });
    if (getAnalytics) {
      getAnalytics.total_count += 1;
      getAnalytics.last_click = Date.now();
      await getAnalytics.save();
      // console.log('if',getAnalytics);
    } else {
      const analytics = new Analytics({ urlId:url._id, browser });
      await analytics.save();
      // console.log('else',analytics);
    }    
    next();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message });
  }
};

export default analytics;