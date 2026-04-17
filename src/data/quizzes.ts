export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MatchingPair {
  term: string;
  definition: string;
}

export interface ChapterActivities {
  quiz: QuizQuestion[];
  matching?: MatchingPair[];
}

export const chapterActivities: Record<string, ChapterActivities> = {
  introduction: {
    quiz: [
      {
        question:
          "A model that memorizes every training example but fails on new data is an example of:",
        options: ["Underfitting", "Overfitting", "Generalization", "Clustering"],
        correctIndex: 1,
        explanation:
          "Overfitting occurs when a model learns the noise in the training data rather than the true underlying pattern, causing it to perform poorly on new, unseen data.",
      },
      {
        question:
          "In supervised learning, what does the algorithm receive during training?",
        options: [
          "Only unlabeled data",
          "Rewards and penalties for actions",
          "Labeled examples with correct answers",
          "Data one example at a time with no labels",
        ],
        correctIndex: 2,
        explanation:
          "Supervised learning uses labeled examples where each training input comes paired with the correct output. The algorithm learns to map inputs to outputs from these pairs.",
      },
      {
        question:
          "Which type of ML problem involves predicting a continuous number rather than a category?",
        options: ["Classification", "Clustering", "Regression", "Ranking"],
        correctIndex: 2,
        explanation:
          "Regression predicts continuous numerical values (like house prices or temperatures), while classification assigns discrete categories.",
      },
    ],
    matching: [
      { term: "Classification", definition: "Sorting items into categories" },
      { term: "Regression", definition: "Predicting a continuous number" },
      { term: "Clustering", definition: "Finding natural groups in data without labels" },
      { term: "Ranking", definition: "Learning to order items by relevance" },
      {
        term: "Dimensionality reduction",
        definition: "Compressing data to fewer features",
      },
    ],
  },
  "pac-learning": {
    quiz: [
      {
        question: "What does PAC stand for?",
        options: [
          "Predictive Algorithm Classification",
          "Probably Approximately Correct",
          "Polynomial Algorithm Complexity",
          "Partial Accuracy Convergence",
        ],
        correctIndex: 1,
        explanation:
          "PAC stands for Probably Approximately Correct. It guarantees that with enough data, the algorithm will probably find a hypothesis that is approximately correct.",
      },
      {
        question:
          "As you increase the size of your training sample, what happens to the gap between empirical error and generalization error?",
        options: [
          "It grows",
          "It stays the same",
          "It shrinks",
          "It oscillates unpredictably",
        ],
        correctIndex: 2,
        explanation:
          "With more training data, the empirical error becomes a better approximation of the true generalization error. The gap between them shrinks.",
      },
      {
        question:
          "A PAC framework guarantee is 'distribution-free.' What does this mean?",
        options: [
          "No probability is involved",
          "The guarantees hold regardless of how the data is distributed",
          "The data must be normally distributed",
          "You don't need any data at all",
        ],
        correctIndex: 1,
        explanation:
          "Distribution-free means the PAC guarantees hold for any possible data distribution. You don't need to know or assume anything about how the data is spread out.",
      },
    ],
    matching: [
      {
        term: "Empirical error",
        definition: "Mistakes on the training data you have",
      },
      {
        term: "Generalization error",
        definition: "Expected mistakes on all possible data",
      },
      {
        term: "Sample complexity",
        definition: "Minimum training examples needed to learn reliably",
      },
      {
        term: "Hypothesis set",
        definition: "The collection of models the algorithm picks from",
      },
    ],
  },
  "rademacher-complexity": {
    quiz: [
      {
        question:
          "If a hypothesis set has high Rademacher complexity, what does that tell you?",
        options: [
          "It generalizes well",
          "It can fit random noise easily, meaning high risk of overfitting",
          "It needs very little training data",
          "It always finds the correct answer",
        ],
        correctIndex: 1,
        explanation:
          "High Rademacher complexity means the model class is very flexible and can fit even random patterns. This flexibility is a double-edged sword: it increases the risk of overfitting.",
      },
      {
        question:
          "The VC-dimension of linear classifiers (lines) in 2D is:",
        options: ["1", "2", "3", "Infinite"],
        correctIndex: 2,
        explanation:
          "Lines in 2D can shatter any set of 3 non-collinear points (produce all 8 possible labelings), but there exist configurations of 4 points that no line can shatter (like the XOR pattern). So VC-dimension is 3.",
      },
      {
        question:
          "Sauer's lemma tells us that the growth function of a hypothesis set with VC-dimension d grows as:",
        options: [
          "Exponentially with sample size",
          "Polynomially with sample size (O(m^d))",
          "Logarithmically with sample size",
          "It stays constant",
        ],
        correctIndex: 1,
        explanation:
          "Sauer's lemma bounds the growth function by O(m^d), which is polynomial rather than exponential. This polynomial growth is what makes learning possible with infinite hypothesis sets.",
      },
    ],
    matching: [
      {
        term: "Rademacher complexity",
        definition: "How well models can fit random noise",
      },
      {
        term: "VC-dimension",
        definition: "Largest set of points a model class can shatter",
      },
      {
        term: "Growth function",
        definition: "Max distinct labelings a model class can produce on m points",
      },
      {
        term: "Shattering",
        definition: "Producing every possible labeling of a set of points",
      },
    ],
  },
  "model-selection": {
    quiz: [
      {
        question:
          "The bias-variance tradeoff means:",
        options: [
          "Simple models and complex models perform equally well",
          "Simple models have high bias but low variance; complex models have the opposite",
          "You should always pick the most complex model",
          "Bias and variance are the same thing",
        ],
        correctIndex: 1,
        explanation:
          "Simple models tend to systematically miss patterns (high bias) but give consistent predictions (low variance). Complex models capture more patterns (low bias) but are sensitive to the specific training data (high variance).",
      },
      {
        question:
          "In 5-fold cross-validation, how many times is each data point used for testing?",
        options: ["0", "1", "5", "It depends on the dataset"],
        correctIndex: 1,
        explanation:
          "In 5-fold cross-validation, the data is split into 5 equal parts. Each fold is used for testing exactly once while the other 4 folds are used for training.",
      },
      {
        question: "L1 regularization (Lasso) is special because it:",
        options: [
          "Always produces the same result as L2",
          "Drives some model weights to exactly zero, performing feature selection",
          "Eliminates the need for training data",
          "Makes the model more complex",
        ],
        correctIndex: 1,
        explanation:
          "L1 regularization produces sparse models where some weights are exactly zero. This effectively selects which features matter and discards the rest.",
      },
    ],
  },
  "support-vector-machines": {
    quiz: [
      {
        question: "What does an SVM try to maximize?",
        options: [
          "The number of support vectors",
          "The training accuracy",
          "The margin between classes",
          "The number of features used",
        ],
        correctIndex: 2,
        explanation:
          "SVMs find the decision boundary that maximizes the margin, the distance between the boundary and the nearest points from each class. A wider margin means more robust classification.",
      },
      {
        question: "Support vectors are:",
        options: [
          "All the training data points",
          "The points closest to the decision boundary that define the margin",
          "The points farthest from the boundary",
          "Randomly selected data points",
        ],
        correctIndex: 1,
        explanation:
          "Support vectors are the critical training points that sit closest to the decision boundary. They define the margin and are the only points that matter for determining the boundary. Remove any other point and the solution stays the same.",
      },
      {
        question:
          "The parameter C in a soft-margin SVM controls:",
        options: [
          "The number of features",
          "The tradeoff between a wide margin and allowing some misclassifications",
          "The learning rate",
          "The number of support vectors exactly",
        ],
        correctIndex: 1,
        explanation:
          "C controls the penalty for margin violations. Large C means 'classify training data correctly even at the cost of a narrow margin.' Small C means 'prefer a wider margin even if some points are misclassified.'",
      },
    ],
    matching: [
      { term: "Margin", definition: "Distance between boundary and nearest points" },
      { term: "Support vectors", definition: "Points that define the decision boundary" },
      { term: "Soft margin", definition: "Allows some misclassifications for a wider gap" },
      { term: "Dual form", definition: "Reformulation using only dot products between points" },
    ],
  },
  "kernel-methods": {
    quiz: [
      {
        question: "The kernel trick allows you to:",
        options: [
          "Skip the training phase entirely",
          "Work in a high-dimensional space without computing the transformation explicitly",
          "Reduce the number of training examples needed",
          "Convert regression to classification",
        ],
        correctIndex: 1,
        explanation:
          "The kernel trick computes dot products in a high-dimensional feature space directly from the original coordinates. You get the benefit of high-dimensional features without the computational cost of actually transforming the data.",
      },
      {
        question: "The Gaussian (RBF) kernel implicitly maps data to:",
        options: [
          "2 dimensions",
          "The same number of dimensions",
          "An infinite-dimensional space",
          "Exactly 100 dimensions",
        ],
        correctIndex: 2,
        explanation:
          "The Gaussian kernel corresponds to an infinite-dimensional feature space, yet computing the kernel function takes only O(n) time. This is the power of the kernel trick at its most dramatic.",
      },
      {
        question: "The representer theorem guarantees that the optimal solution:",
        options: [
          "Always uses all training points equally",
          "Can be written as a weighted combination of kernel evaluations at training points",
          "Is always a linear function",
          "Requires infinite computation",
        ],
        correctIndex: 1,
        explanation:
          "The representer theorem says you only need one weight per training example, regardless of the dimensionality of the feature space. Even with an infinite-dimensional kernel, you only learn as many numbers as you have training points.",
      },
    ],
  },
  boosting: {
    quiz: [
      {
        question: "A 'weak learner' in boosting is a classifier that:",
        options: [
          "Always gets the right answer",
          "Is just slightly better than random guessing",
          "Uses deep neural networks",
          "Requires enormous amounts of data",
        ],
        correctIndex: 1,
        explanation:
          "A weak learner only needs to be slightly better than random guessing (e.g., 51% accuracy instead of 50%). Boosting's key insight is that combining many such weak learners can produce a strong classifier.",
      },
      {
        question: "In each round of AdaBoost, what happens to misclassified examples?",
        options: [
          "They are removed from the dataset",
          "Their weights are increased so the next learner focuses on them",
          "They are labeled as outliers",
          "Nothing changes",
        ],
        correctIndex: 1,
        explanation:
          "AdaBoost increases the weight of misclassified examples after each round. This forces subsequent weak learners to pay more attention to the examples that previous learners got wrong.",
      },
      {
        question:
          "Why does boosting often keep improving test accuracy even after achieving zero training error?",
        options: [
          "It's memorizing the test set",
          "It continues to increase the margins, making predictions more confident",
          "It starts using a different algorithm",
          "This never actually happens",
        ],
        correctIndex: 1,
        explanation:
          "Even after training error hits zero, additional rounds increase the margins of correct classifications. Larger margins mean more robust predictions and better generalization.",
      },
    ],
  },
  "online-learning": {
    quiz: [
      {
        question: "What makes online learning fundamentally different from batch learning?",
        options: [
          "It requires more data",
          "It processes examples one at a time, updating the model after each",
          "It only works with neural networks",
          "It needs labeled data",
        ],
        correctIndex: 1,
        explanation:
          "In online learning, the algorithm sees one example at a time, makes a prediction, learns the truth, and updates immediately. There's no separate training phase with a big batch of data.",
      },
      {
        question: "The 'regret' in online learning measures:",
        options: [
          "How sad the algorithm is about mistakes",
          "The difference between your total error and the best fixed strategy in hindsight",
          "The number of training examples wasted",
          "How long the algorithm takes to run",
        ],
        correctIndex: 1,
        explanation:
          "Regret compares your cumulative loss to what you would have achieved by following the single best strategy (chosen with perfect hindsight). Low regret means you performed nearly as well as the best fixed strategy.",
      },
      {
        question: "The Perceptron's mistake bound depends on:",
        options: [
          "The number of dimensions",
          "The number of training examples",
          "The ratio R/\u03B3 (data radius over margin)",
          "The type of kernel used",
        ],
        correctIndex: 2,
        explanation:
          "The Perceptron makes at most (R/\u03B3)^2 mistakes, where R is the radius of the data and \u03B3 is the margin. Notably, this doesn't depend on the number of dimensions at all.",
      },
    ],
  },
  "multi-class-classification": {
    quiz: [
      {
        question:
          "In the One-vs-All strategy for multi-class classification with K classes, how many binary classifiers are trained?",
        options: ["1", "K", "K(K-1)/2", "2^K"],
        correctIndex: 1,
        explanation:
          "One-vs-All trains exactly K classifiers, one per class. Each classifier learns to distinguish its class from all other classes combined.",
      },
      {
        question:
          "Error-Correcting Output Codes (ECOC) are robust to individual classifier mistakes because:",
        options: [
          "They use the most powerful classifiers available",
          "Each class has a binary code, and the system tolerates bit errors like a QR code",
          "They only work with two classes",
          "They retrain when mistakes happen",
        ],
        correctIndex: 1,
        explanation:
          "ECOC assigns each class a binary codeword and uses error-correcting properties from information theory. Even if some bit-classifiers make errors, the overall code is still closest to the correct class.",
      },
    ],
    matching: [
      { term: "One-vs-All", definition: "Train one classifier per class against all others" },
      { term: "One-vs-One", definition: "Train one classifier for every pair of classes" },
      { term: "Decision tree", definition: "Classify by asking a sequence of questions about features" },
      { term: "ECOC", definition: "Assign binary codes to classes for error tolerance" },
    ],
  },
  ranking: {
    quiz: [
      {
        question: "AUC (Area Under the ROC Curve) of 1.0 means:",
        options: [
          "The model is terrible",
          "The model ranks every positive item above every negative item perfectly",
          "The model is random",
          "The test set is empty",
        ],
        correctIndex: 1,
        explanation:
          "An AUC of 1.0 means perfect ranking: every positive example gets a higher score than every negative example. AUC of 0.5 means random guessing.",
      },
      {
        question: "Ranking differs from classification because:",
        options: [
          "It uses different programming languages",
          "The relative order of items matters, not just individual labels",
          "It doesn't need training data",
          "It only works with text data",
        ],
        correctIndex: 1,
        explanation:
          "In ranking, what matters is whether item A is placed above or below item B. Classification judges each item independently, but ranking is fundamentally about relationships between items.",
      },
    ],
  },
  regression: {
    quiz: [
      {
        question: "The Lasso (L1 regularization) is particularly useful when:",
        options: [
          "All features are equally important",
          "You suspect only a few features actually matter out of many",
          "You have very little data",
          "You need a non-linear model",
        ],
        correctIndex: 1,
        explanation:
          "The Lasso drives irrelevant feature weights to exactly zero, effectively performing feature selection. It's ideal when you have many features but suspect only a handful actually predict the target.",
      },
      {
        question: "In kernel ridge regression, the 'ridge' part refers to:",
        options: [
          "The shape of the decision boundary",
          "L2 regularization that prevents overfitting",
          "A type of kernel function",
          "The mountain-shaped loss function",
        ],
        correctIndex: 1,
        explanation:
          "Ridge regression adds an L2 penalty (sum of squared weights) to the loss function. This regularization shrinks weights toward zero and prevents the model from overfitting, especially when features are correlated.",
      },
    ],
    matching: [
      { term: "Linear regression", definition: "Fit a straight line/hyperplane minimizing squared error" },
      { term: "Kernel ridge regression", definition: "Nonlinear regression using the kernel trick plus L2 penalty" },
      { term: "SVR", definition: "Ignores errors smaller than epsilon, uses support vectors" },
      { term: "Lasso", definition: "L1 penalty that produces sparse models with feature selection" },
    ],
  },
  "maximum-entropy": {
    quiz: [
      {
        question: "The maximum entropy principle says you should choose the distribution that:",
        options: [
          "Is the most complex possible",
          "Makes the fewest assumptions beyond what the data supports",
          "Has the lowest entropy",
          "Ignores all constraints from the data",
        ],
        correctIndex: 1,
        explanation:
          "Maximum entropy means choosing the distribution with the highest uncertainty (entropy) that still matches your observed data constraints. Any lower-entropy distribution would imply assumptions your data doesn't support.",
      },
      {
        question: "Maximum entropy models turn out to be mathematically equivalent to:",
        options: [
          "Decision trees",
          "K-nearest neighbors",
          "Exponential family distributions",
          "Random forests",
        ],
        correctIndex: 2,
        explanation:
          "The maximum entropy solution always takes the form of an exponential family distribution. This connects the maximum entropy principle to one of the most important families in statistics.",
      },
    ],
  },
  "conditional-maxent": {
    quiz: [
      {
        question: "Logistic regression is actually a special case of:",
        options: [
          "Linear regression",
          "Conditional maximum entropy models",
          "K-means clustering",
          "Random forests",
        ],
        correctIndex: 1,
        explanation:
          "Logistic regression is exactly a conditional maximum entropy model. This means it's the least biased conditional model consistent with the observed feature-label relationships.",
      },
      {
        question:
          "The sigmoid function in logistic regression maps any number to:",
        options: [
          "An integer",
          "A value between 0 and 1 (a probability)",
          "A negative number",
          "Exactly 0 or 1",
        ],
        correctIndex: 1,
        explanation:
          "The sigmoid function squashes any real number into the range (0, 1), which can be interpreted as a probability. This is what makes logistic regression output genuine probabilities rather than just scores.",
      },
    ],
  },
  "algorithmic-stability": {
    quiz: [
      {
        question:
          "An algorithm with good stability means that:",
        options: [
          "It always produces the same output",
          "Removing or changing one training example barely changes the result",
          "It runs very fast",
          "It uses fewer features",
        ],
        correctIndex: 1,
        explanation:
          "Uniform stability means small changes in the training data (like removing one point) lead to small changes in the algorithm's output. Stable algorithms resist overfitting because they don't rely too heavily on any single example.",
      },
      {
        question:
          "Regularization improves stability because it:",
        options: [
          "Makes the model faster to train",
          "Constrains the model, preventing it from over-reacting to individual data points",
          "Adds more training data",
          "Removes outliers from the dataset",
        ],
        correctIndex: 1,
        explanation:
          "Regularization constrains the model's complexity, which limits how much any single data point can influence the result. This makes the algorithm more stable and leads directly to better generalization bounds.",
      },
    ],
  },
  "dimensionality-reduction": {
    quiz: [
      {
        question: "PCA finds directions that:",
        options: [
          "Minimize the data variance",
          "Maximize the variance of the projected data",
          "Are random",
          "Have the most outliers",
        ],
        correctIndex: 1,
        explanation:
          "PCA finds the directions along which the data varies the most. Projecting onto these directions preserves as much information as possible while reducing dimensionality.",
      },
      {
        question:
          "The Johnson-Lindenstrauss lemma is surprising because the target dimension depends on:",
        options: [
          "The original dimension",
          "Only the number of points and desired accuracy, not the original dimension",
          "The type of data",
          "The number of features",
        ],
        correctIndex: 1,
        explanation:
          "The JL lemma says you only need O(log n / epsilon^2) dimensions to approximately preserve pairwise distances of n points. The original dimension doesn't matter at all, which is remarkable.",
      },
    ],
    matching: [
      { term: "PCA", definition: "Find directions of maximum variance, project onto them" },
      { term: "Kernel PCA", definition: "Nonlinear dimensionality reduction using kernels" },
      { term: "Isomap", definition: "Preserve distances along the curved surface of the data" },
      { term: "Random projection", definition: "Multiply by a random matrix, distances approximately preserved" },
    ],
  },
  "learning-automata": {
    quiz: [
      {
        question: "A finite automaton is:",
        options: [
          "A neural network",
          "A machine with fixed states that reads input one symbol at a time",
          "A database query engine",
          "A type of kernel function",
        ],
        correctIndex: 1,
        explanation:
          "A finite automaton is the simplest model of computation: it has a fixed set of states, reads input symbols one at a time, and transitions between states based on what it reads.",
      },
      {
        question:
          "Angluin's L* algorithm learns automata using queries, which shows that:",
        options: [
          "All learning problems are easy",
          "Active learning (choosing what to observe) can be exponentially more efficient than passive learning",
          "Queries are useless for learning",
          "Automata can't be learned",
        ],
        correctIndex: 1,
        explanation:
          "L* learns automata with polynomially many queries, while learning from random examples alone can require exponentially many. This demonstrates the power of active learning.",
      },
    ],
  },
  "reinforcement-learning": {
    quiz: [
      {
        question:
          "The exploration-exploitation dilemma in RL is about:",
        options: [
          "Choosing between two different algorithms",
          "Balancing trying new actions versus sticking with known good actions",
          "Deciding how much data to collect",
          "Choosing the right reward function",
        ],
        correctIndex: 1,
        explanation:
          "Exploration means trying new, potentially better actions. Exploitation means using the best action found so far. Too much exploration wastes time; too little means you might never discover the optimal strategy.",
      },
      {
        question: "Q-learning is 'off-policy' because it:",
        options: [
          "Doesn't use any policy",
          "Learns the optimal policy even while following a different (exploratory) policy",
          "Only works offline",
          "Requires a human teacher",
        ],
        correctIndex: 1,
        explanation:
          "Q-learning updates its Q-values using the maximum over all actions in the next state, regardless of which action was actually taken. This means it converges to the optimal policy even while exploring freely.",
      },
      {
        question: "In a Markov Decision Process, the 'Markov' property means:",
        options: [
          "The process is named after a person called Markov",
          "The future depends only on the current state and action, not the full history",
          "All states are equally likely",
          "The process never terminates",
        ],
        correctIndex: 1,
        explanation:
          "The Markov property simplifies the problem enormously: to decide what to do next, you only need to know where you are now, not how you got there. The current state contains all the information needed.",
      },
    ],
    matching: [
      { term: "Policy", definition: "A rule that maps states to actions" },
      { term: "Value function", definition: "Expected total reward from a state onward" },
      { term: "Q-value", definition: "Expected reward for taking a specific action in a specific state" },
      { term: "Discount factor", definition: "Makes future rewards worth less than immediate ones" },
      { term: "TD learning", definition: "Update value estimates after each step, not just at episode end" },
    ],
  },
};
