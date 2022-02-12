from urllib.parse import urlparse,urlencode
import ipaddress
import re
from bs4 import BeautifulSoup
import whois
import urllib
import urllib.request
from datetime import datetime

# 1.Domain of the URL (Domain) 
def getDomain(url):  
  domain = urlparse(url).netloc
  if re.match(r"^www.",domain):
        domain = domain.replace("www.","")
  return domain

def https(url):
  if(url[0:5]=='https'):
    return -1
  elif(url[0:5]!='https'):
    return 1

def anchorURL(url):
  urllist = []
  fraudList = []
  mainDomain = getDomain(url)
  print(mainDomain)
  html_page = urllib.request.urlopen(url)
  soup = BeautifulSoup(html_page,"lxml")
  for link in soup.findAll('a'):
    hyperlink = link.get('href')
    if(hyperlink!=None):
      if(hyperlink[0:4]=='http'):
        urllist.append(hyperlink)
  for i in urllist:
    if(getDomain(i).find(mainDomain)==-1):
      fraudList.append(getDomain(i))
  # print(fraudList)
  if len(fraudList)>=10:
    return 1
  else:
    return -1

def web_traffic(url):
  try:
    #Filling the whitespaces in the URL if any
    url = urllib.parse.quote(url)
    rank = BeautifulSoup(urllib.request.urlopen("http://data.alexa.com/data?cli=10&dat=s&url=" + url).read(), "xml").find(
        "REACH")['RANK']
    rank = int(rank)
  except TypeError:
        return 1
  if rank <100000:
    return 1
  else:
    return -1

def subDomain(url):
  urllist = []
  # fraudList = []
  from bs4 import BeautifulSoup
  import urllib.request
  import re
  mainDomain = getDomain(url)
  # print(mainDomain)
  html_page = urllib.request.urlopen(url)
  soup = BeautifulSoup(html_page,"lxml")
  for link in soup.findAll('a'):
    hyperlink = link.get('href')
    if(hyperlink!=None):
      if(hyperlink[0:4]=='http'):
        urllist.append(hyperlink)
  max_cnt=0;
  for i in urllist:
    linkDomain = getDomain(i)
    if(linkDomain.find(mainDomain)!=-1):
      cnt=0
      for c in linkDomain:
        if(c=='.'):
          cnt+=1
      max_cnt = max(max_cnt,cnt)
      # fraudList.append(getDomain(i))
  max_cnt-=1
  # print(fraudList)
  if(max_cnt==1):
    return 0
  elif(max_cnt>1):
    return 1
  else:
    return -1

def prefixSuffix(url):
    if '-' in urlparse(url).netloc:
        return 1            # phishing
    else:
        return -1            # legitimate

def MetaScriptLink(url):
  html_page = urllib.request.urlopen(url)
  soup = BeautifulSoup(html_page,"lxml")
  script=0
  script_diff=0
  link_tag=0
  link_diff=0
  for link in soup.findAll():
    if(link.name=='script' or link.name=='<script'):
      script+=1
      hyperlink = link.get('src')
      if(hyperlink!=None and hyperlink[0:4]=='http' and getDomain(hyperlink)!=getDomain(url)):
        script_diff+=1
    if(link.name=='link' or link.name=='<link'):
      link_tag+=1
      hyperlink = link.get('href')
      if(hyperlink!=None and hyperlink[0:4]=='http' and getDomain(hyperlink)!=getDomain(url)):
        link_diff+=1
    try:
        result = (script_diff + link_diff)/(script + link_tag)
    except ZeroDivisionError:
        return -1
    if(result<0.17):return -1
    elif(result>=0.17 and result<0.81):return 0
    else:return 1


def Requesturl(url):
    html_page = urllib.request.urlopen(url)
    soup = BeautifulSoup(html_page)
    cnt=0
    total=0
    for link in soup.findAll('a', href=True):
      total+=1
      if(getDomain(link.get('href'))==getDomain(url)):
        cnt+=1
  # print(cnt," ",total)
    try:
      result = cnt/total  
      if(result<0.22):
        return -1
      elif(result>=0.22 and result<0.61):
        return 0
      else:
        return 1
    except ZeroDivisionError as e:
      return -1

def ServerFormHandler(url):
  from bs4 import BeautifulSoup
  import urllib.request
  import re
  html_page = urllib.request.urlopen(url)
  soup = BeautifulSoup(html_page,"lxml")
  for link in soup.findAll('form'):
    hyperlink = link.get('action')
    about = link.get('about')
    if(about=='blank'):return 1
    elif(hyperlink!=None and hyperlink[0:4]=='http' and getDomain(hyperlink)!=getDomain(url)):return 0
  return -1

def domainRegLen(domain_name):
  expiration_date = domain_name.expiration_date
  if isinstance(expiration_date,str):
    try:
      expiration_date = datetime.strptime(expiration_date,"%Y-%m-%d")
    except:
      return 1
  if (expiration_date is None):
      return 1
  elif (type(expiration_date) is list):
      return 1
  else:
    today = datetime.now()
    end = abs((expiration_date - today).days)
    if ((end/30) < 6):
      end = 0
    else:
      end = 1
  return end

  # 11. Age of Domain: The difference between termination time and creation time (Domain_Age)  
def domainAge(domain_name):
  creation_date = domain_name.creation_date
  expiration_date = domain_name.expiration_date
  if (isinstance(creation_date,str) or isinstance(expiration_date,str)):
    try:
      creation_date = datetime.strptime(creation_date,'%Y-%m-%d')
      expiration_date = datetime.strptime(expiration_date,"%Y-%m-%d")
    except:
      return 1
  if ((expiration_date is None) or (creation_date is None)):
      return 1
  elif ((type(expiration_date) is list) or (type(creation_date) is list)):
      return 1
  else:
    ageofdomain = abs((expiration_date - creation_date).days)
    if ((ageofdomain/30) < 6):
      age = 1
    else:
      age = -1
  return age

def usingIP(url):
  try:
    ipaddress.ip_address(getDomain(url))
    ip = 1
  except:
    ip = -1
  return ip


#Function to extract features
def featureExtraction(url):

  features = []
  features.append(usingIP(url))#12
  print("usingIP done")
  features.append(prefixSuffix(url))#5
  print("prefix done")
  features.append(subDomain(url))#4
  print("subdomain done")
  features.append(https(url))#1
  print("https done")
  features.append(anchorURL(url))#2
  print("achor url done")
  #Domain based features (4)
  dns = 0
  try:
    domain_name = whois.whois(urlparse(url).netloc)
  except:
    dns = 1

  #features.append(dns)
  features.append(web_traffic(url))#3
  print("web_trafic done")
  features.append(1 if dns == 1 else domainRegLen(domain_name))#10
  features.append(Requesturl(url))#7
  print("request url done")
  features.append(MetaScriptLink(url))#6
  print("metascript done")
  features.append(ServerFormHandler(url))#8
  print("server form handler done")
  features.append(1 if dns == 1 else domainAge(domain_name))#11
  print("domain age done")
  features.append(0)
  
  return features