const models = [
  {
    id: 1,
    name: 'Logistic Regression',
    imageUrl: 'logistic.png',
    accuracy: '92%',
    matrix: [{ id: -1, value: [0.83, 0.93, 0.9] }],
    intro:
      "Logistic regression is another powerful supervised ML algorithm used for binary classification problems (when target is categorical). The best way to think about logistic regression is that it is a linear regression but for classification problems. Logistic regression essentially uses a logistic function to model a binary output variable. The primary difference between linear regression and logistic regression is that logistic regression's range is bounded between 0 and 1. In addition, as opposed to linear regression, logistic regression does not require a linear relationship between inputs and output variables.",
  },
  {
    id: 2,
    name: 'Decision Tree',
    imageUrl: 'decision.png',
    accuracy: '95%',
    matrix: [{ id: -1, value: [0.95, 0.94, 0.94] }],
    intro:
      ' Decision tree is the most powerful and popular tool for classification and prediction. A Decision tree is a flowchart like tree structure, where each internal node denotes a test on an attribute, each branch represents an outcome of the test, and each leaf node (terminal node) holds a class label. ',
  },
  {
    id: 3,
    name: 'KNN',
    accuracy: '93%',
    imageUrl: 'knn.png',
    matrix: [{ id: -1, value: [0.9, 0.94, 0.92] }],
    intro:
      'KNN is a machine learning algorithm which is used for both classification (using KNearestClassifier) and Regression (using KNearestRegressor) problems.In KNN algorithm K is the Hyperparameter. Choosing the right value of K matters. A machine learning model is said to have high model complexity if the built model is having low Bias and High Variance.',
  },
  {
    id: 4,
    name: 'Random Forest',
    imageUrl: 'random_forest.png',
    accuracy: '96%',
    matrix: [{ id: -1, value: [0.94, 0.96, 0.95] }],
    intro:
      'A random forest is a supervised machine learning algorithm that is constructed from decision tree algorithms. This algorithm is applied in various industries such as banking and e-commerce to predict behavior and outcomes.',
  },
  {
    id: 5,
    name: 'SVM',
    accuracy: '94%',
    imageUrl: 'svm.png',
    matrix: [{ id: -1, value: [0.91, 0.95, 0.93] }],
    intro:
      'Support Vector Machine(SVM) is a supervised machine learning algorithm used for both classification and regression. Though we say regression problems as well its best suited for classification. The objective of SVM algorithm is to find a hyperplane in an N-dimensional space that distinctly classifies the data points. The dimension of the hyperplane depends upon the number of features. If the number of input features is two, then the hyperplane is just a line. If the number of input features is three, then the hyperplane becomes a 2-D plane. It becomes difficult to imagine when the number of features exceeds three',
  },
  {
    id: 6,
    name: 'Naive Bayes',
    accuracy: '59%',
    imageUrl: 'naive.png',
    matrix: [{ id: -1, value: [1.0, 0.52, 0.68] }],
    intro:
      'Naive Bayes classifiers are a collection of classification algorithms based on Bayes’ Theorem. It is not a single algorithm but a family of algorithms where all of them share a common principle, i.e. every pair of features being classified is independent of each other.',
  },
  {
    id: 7,
    name: 'AdaBoost',
    accuracy: '91%',
    imageUrl: 'adaBoost.png',
    matrix: [{ id: -1, value: [0.89, 0.91, 0.9] }],
    intro:
      'AdaBoost algorithm, short for Adaptive Boosting, is a Boosting technique used as an Ensemble Method in Machine Learning. It is called Adaptive Boosting as the weights are re-assigned to each instance, with higher weights assigned to incorrectly classified instances. Boosting is used to reduce bias as well as variance for supervised learning. It works on the principle of learners growing sequentially. Except for the first, each subsequent learner is grown from previously grown learners. In simple words, weak learners are converted into strong ones.',
  },
  {
    id: 8,
    name: 'XGBoost',
    imageUrl: 'xgBoost.png',
    accuracy: '94%',
    matrix: [{ id: -1, value: [0.92, 0.9, 0.93] }],
    intro:
      'XGBoost is a decision-tree-based ensemble Machine Learning algorithm that uses a gradient boosting framework. In prediction problems involving unstructured data (images, text, etc.) artificial neural networks tend to outperform all other algorithms or frameworks. However, when it comes to small-to-medium structured/tabular data, decision tree based algorithms are considered best-in-class right now. ',
  },
]

export default models
