import pickle
import pandas as pd
import FeatureExtraction
model=pickle.load(open('model.pkl','rb'))

feature_names = ['UsingIP','PrefixSuffix-', 'SubDomains', 'HTTPS', 'DomainRegLen', 'RequestURL', 'AnchorURL',
       'LinksInScriptTags', 'ServerFormHandler','AgeofDomain',
       'WebsiteTraffic', 'LinksPointingToPage']
URL= 'https://www.youtube.com/watch?v=aXgoJs7_HDY'
# features=[[-1,-1,-1,-1,-1,1,1,-1,-1,-1,1,0]]
features=[FeatureExtraction.featureExtraction(URL)]
Test_Case_Input = pd.DataFrame(features, columns= feature_names)
def type():
    x=model.predict(Test_Case_Input)
    print(x[0])

type()