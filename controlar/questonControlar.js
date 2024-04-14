const Question = require("../models/Question");

exports.createQuestion = async (req, res) => {
  const { questionName, first, second, third, answer, category } = req.body;
  console.log(req.body.second);
  // console.log(req)
  if (!category) {
    return res.status(400).json({
      error: "Category Must Need"
    })
  }
  if (!questionName || !first || !second || !third || !answer) {
    return res.status(400).json({
      error: "All fields are required. Please fill in all the fields.",
    });
  }

  try {
    const question = await Question({
      answer: answer,
      questionName: questionName,
      incorrect_answer: [first, second, third],
      first: first,  
      second: second,
      third: third,
      category: category
    });

    question.save();
    console.log(question)
    return res.status(201).json({
      ok: true,
      question,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};



exports.getAllQuestions = async (req, res) => {
  const questions = await Question.find().sort({ createdAt: -1 }).limit(20);
  res.json(questions);
  // console.log(questions)
};
// 
exports.getQuestionByVocabulary = async (req, res) => {
  try {
    const questions = await Question.find({ category: "Vocabulary" })
      .sort({ createdAt: -1 }).limit(20);
    res.json(questions);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}
// 
exports.getQuestionByGrammer = async (req, res) => {
  try {
    const questions = await Question.find({ category: "Grammer" })
      .sort({ createdAt: -1 }).limit(20);
    res.json(questions);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}
// 

exports.getQuestionByReading = async (req, res) => {
  try {
    const questions = await Question.find({ category: "Reading" })
      .sort({ createdAt: -1 }).limit(20);
    res.json(questions);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}
// 
exports.getQuestionByKanji = async (req, res) => {
  try {
    const questions = await Question.find({ category: "Kanji" })
      .sort({ createdAt: -1 }).limit(20);
    res.json(questions);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}
// 
exports.getQuestionByFullOne = async (req, res) => {
  try {
    const questions = await Question.find({ category: "FullOne" })
      .sort({ createdAt: -1 }).limit(20);
    res.json(questions);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}
// 
exports.getQuestionByFullTwo = async (req, res) => {
  try {
    const questions = await Question.find({ category: "FullTwo" })
      .sort({ createdAt: -1 }).limit(20);
    res.json(questions);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}
// 

exports.updateQuestion = async (req, res) => {
  const { questionName, first, second, third, fourth, answer } = req.body;
  const { _id } = req.params;
  // console.log(_id)
  try {
    const question = await Question.findByIdAndUpdate(
      _id,
      {
        answer: answer,
        questionName: questionName,
        incorrect_answer: [first, second, third],

      },
      {
        new: true,
      }
    );
    res.json(question);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteQuestion = async (req, res) => {

  const _id = req.params._id;
  try {
    const question = await Question.findByIdAndDelete({ _id });
    res.json(question);
  } catch (err) {
    console.log(err);
  }
};
exports.totalPosts = async (req, res) => {
  try {
    const total = await Question.find().estimatedDocumentCount();
    res.json(total);
  } catch (err) {
    console.log(err);
  }
};
// single question :
exports.singleQuestion = async (req, res) => {
  try {
    const { _id } = req.params;
    const question = await Question.findById(_id);
    // console.log(_id)
    res.json(question);
    // console.log(question)
  } catch (err) {
    console.log(err);
  }
};