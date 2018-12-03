from google_images_search import GoogleImagesSearch

gis = GoogleImagesSearch('AIzaSyB-...', '...')

def isearch(query):
    search_params = {
        'q': query,
        'num': 1,
        'safe': 'off',
        'fileType': 'jpg',
        'imgType': 'photo',
        'imgSize': 'large',
        'searchType': 'image',
    }

    gis.search(search_params=search_params)

    for image in gis.results():
         return image.url
