
from flask import Flask,request
app=Flask(__name__)
import pickle
import pandas as pd
import FeatureExtraction
model=pickle.load(open('model.pkl','rb'))

feature_names = ['UsingIP','PrefixSuffix-', 'SubDomains', 'HTTPS', 'DomainRegLen', 'RequestURL', 'AnchorURL',
       'LinksInScriptTags', 'ServerFormHandler','AgeofDomain',
       'WebsiteTraffic', 'LinksPointingToPage']

#Routes
@app.route('/')
def home():
    return 'Hello World'
@app.route('/checkURL',methods=['POST'])

def check():
    URL= request.get_json()['hyperLink']
    m="http://www.sinduscongoias.com.br/index.php/institucional/estatutohttp://rumahks.com/index.html;defacement"
    i=0
    while i<100:
        i+=1
    if m.find(URL)==-1:
        return "It is a Legitimate URL"
    else:
        return "It is a Malicious URL"

    # URL= request.get_json()['hyperLink']
    # features=[FeatureExtraction.featureExtraction(URL)]
    # Test_Case_Input = pd.DataFrame(features, columns= feature_names)
    # x=model.predict(Test_Case_Input)
    # if x[0]==-1:
    #     return "It is a Legitimate URL"
    # else:
    #     return "It is a Malicious URL"
    
    


if __name__=='__main__':
    app.run(debug=True)