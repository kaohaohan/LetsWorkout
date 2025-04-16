import express from "express";
import Exercise from "../models/Exercise.js";

const router = express.Router();

// 獲取所有運動
router.get("/", async (req, res) => {
  try {
    //這樣寫沒有任何條件過濾
    //可能要再加上一些filter
    const query = {};
    const sortOption = {};
    //body part判斷
    if (req.query.bodyPart) {
      query.bodyPart = req.query.bodyPart;
    }
    //加上category判斷
    if (req.query.category) {
      query.category = req.query.category;
    }
    //加上模糊搜尋條件然後輸入時不分大小寫 "i" 選項表示不區分大小寫。
    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: "i" };
    }
    //ABCD排序
    if (req.query.sortBy) {
      sortOption[req.query.sortBy] = req.query.order === "desc" ? -1 : 1;
    }

    const exercises = await Exercise.find(query).sort(sortOption);
    console.log(req.query);
    res.status(200).json(exercises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 創建運動
router.post("/", async (req, res) => {
  try {
    const { name, bodyPart } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!bodyPart)
      return res.status(400).json({ message: "Body part is required" });
    const existingExercise = await Exercise.findOne({ name });
    if (existingExercise) {
      return res.status(400).json({ message: "Exercise already exists" });
    }
    const exercise = new Exercise(req.body);
    const newExercise = await exercise.save();

    res.status(201).json(newExercise);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 獲取單個運動
router.get("/:id", async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.status(200).json(exercise);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const errorHandler = (err, req, res, next) => {
  // 處理常見錯誤
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "數據驗證失敗",
      details: err.message,
    });
  }

  // 處理未找到資源
  if (err.name === "NotFoundError") {
    return res.status(404).json({
      error: "資源不存在",
    });
  }

  // 其他錯誤
  res.status(500).json({
    error: "服務器錯誤",
  });
};

export default router;
