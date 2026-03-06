import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

print("Loading datasets...")


# -----------------------------
# ISOT DATASET
# -----------------------------

fake = pd.read_csv("../dataset/Fake.csv")
true = pd.read_csv("../dataset/True.csv")

fake["label"] = 0
true["label"] = 1

fake["text"] = fake["title"] + " " + fake["text"]
true["text"] = true["title"] + " " + true["text"]

data1 = pd.concat([
    fake[["text","label"]],
    true[["text","label"]]
])


# -----------------------------
# WELFAKE DATASET
# -----------------------------

wel = pd.read_csv("../dataset/WELFake_Dataset.csv")
wel = wel.dropna()

wel["text"] = wel["title"] + " " + wel["text"]

data2 = wel[["text","label"]]


# -----------------------------
# FAKENEWSNET DATASET
# -----------------------------

g_fake = pd.read_csv("../dataset/gossipcop_fake.csv")
g_real = pd.read_csv("../dataset/gossipcop_real.csv")
p_fake = pd.read_csv("../dataset/politifact_fake.csv")
p_real = pd.read_csv("../dataset/politifact_real.csv")

g_fake["text"] = g_fake["title"]
g_real["text"] = g_real["title"]
p_fake["text"] = p_fake["title"]
p_real["text"] = p_real["title"]

g_fake["label"] = 0
g_real["label"] = 1
p_fake["label"] = 0
p_real["label"] = 1

data3 = pd.concat([
    g_fake[["text","label"]],
    g_real[["text","label"]],
    p_fake[["text","label"]],
    p_real[["text","label"]]
])


# -----------------------------
# LIAR DATASET
# -----------------------------

try:

    liar = pd.read_csv("../dataset/liar_dataset.tsv", sep="\t", header=None)

    liar = liar[[1,2]]
    liar.columns = ["label","text"]

    liar["label"] = liar["label"].apply(
        lambda x: 1 if x in ["true","mostly-true","half-true"] else 0
    )

    data4 = liar[["text","label"]]

    print("LIAR dataset loaded")

except:

    data4 = pd.DataFrame(columns=["text","label"])
    print("LIAR dataset not found — skipping...")


# -----------------------------
# COMBINE DATASETS
# -----------------------------

data = pd.concat([data1,data2,data3,data4])

data = data.dropna()

print("Total training samples:", len(data))


# -----------------------------
# TRAIN MODEL
# -----------------------------

X = data["text"]
y = data["label"]

vectorizer = TfidfVectorizer(
    stop_words="english",
    max_df=0.7,
    ngram_range=(1,2),
    max_features=50000
)

X_vectorized = vectorizer.fit_transform(X)

X_train,X_test,y_train,y_test = train_test_split(
    X_vectorized,
    y,
    test_size=0.2,
    random_state=42
)

model = LogisticRegression(
    max_iter=3000,
    C=2
)

model.fit(X_train,y_train)

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test,y_pred)

print("Model Accuracy:", accuracy)


# -----------------------------
# SAVE MODEL
# -----------------------------

joblib.dump(model,"model.pkl")
joblib.dump(vectorizer,"vectorizer.pkl")

print("Model saved successfully!")