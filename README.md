# sites-for-humanity

## Setup

### Python

Install Anaconda (or Miniconda). Then run:

```
conda create -n Hack2018 python=3.6
source activate Hack2018

pip install pymorphy2 yargy bottle dialogflow pydub
pip install -U pymorphy2-dicts-ru
```

```
# deprecated, do not use
pip install google-cloud-speech==0.36.0
```

## Keys

You must have dev access (keys etc) to some Google resources. Namely, DialogFlow (environment variable, plus project ID in `python/server.py`) and Google Search API (two keys, setted in `python/images.py`)
