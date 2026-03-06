import pandas as pd
from sklearn.model_selection import train_test_split
from transformers import BertTokenizer, BertForSequenceClassification
from transformers import Trainer, TrainingArguments
import torch
from datasets import Dataset

# Load datasets
fake = pd.read_csv("../dataset/Fake.csv")
true = pd.read_csv("../dataset/True.csv")
wel = pd.read_csv("../dataset/WELFake_Dataset.csv")

fake["label"] = 0
true["label"] = 1

data1 = pd.concat([fake, true])
data1["content"] = data1["title"] + " " + data1["text"]
data1 = data1[["content","label"]]

wel = wel.dropna()
wel["content"] = wel["title"] + " " + wel["text"]
data2 = wel[["content","label"]]

data = pd.concat([data1,data2]).drop_duplicates()

train_texts, test_texts, train_labels, test_labels = train_test_split(
    data["content"], data["label"], test_size=0.2
)

tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

train_encodings = tokenizer(list(train_texts), truncation=True, padding=True)
test_encodings = tokenizer(list(test_texts), truncation=True, padding=True)

train_dataset = Dataset.from_dict({
    **train_encodings,
    "labels": list(train_labels)
})

test_dataset = Dataset.from_dict({
    **test_encodings,
    "labels": list(test_labels)
})

model = BertForSequenceClassification.from_pretrained(
    "bert-base-uncased",
    num_labels=2
)

training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=2,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=test_dataset
)

trainer.train()

model.save_pretrained("bert_fake_news_model")
tokenizer.save_pretrained("bert_fake_news_model")

print("BERT model training complete")