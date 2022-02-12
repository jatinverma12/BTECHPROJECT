import pandas as pd
import numpy as np
from matplotlib import pyplot as plt
from sklearn.model_selection import train_test_split,cross_val_score
from sklearn.ensemble import RandomForestClassifier
import seaborn as sns
import pickle

df=pd.read_csv("./phishing.csv")

X= df[['UsingIP','PrefixSuffix-', 'SubDomains', 'HTTPS', 'DomainRegLen', 'RequestURL', 'AnchorURL',
       'LinksInScriptTags', 'ServerFormHandler','AgeofDomain',
       'WebsiteTraffic', 'LinksPointingToPage']]

Y=df[['class']]

train_X,test_X,train_Y,test_Y=train_test_split(X,Y,test_size=0.3,random_state=10)
Forest_model=RandomForestClassifier()
Forest_model.fit(train_X,train_Y.values.ravel())
pickle.dump(Forest_model,open('model.pkl','wb'))