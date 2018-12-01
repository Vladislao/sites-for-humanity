import re
import pymorphy2

RE_WORDS = re.compile(r'[а-яa-z0-9]+')
morph = pymorphy2.MorphAnalyzer()

context_data = {}


WORDS_COMMAND_CREATE = {'создать', 'сделать'}

WORDS_ITEM_NAVBAR = {'навигационный', 'меню'}
WORDS_ITEM_HEADER = {'заголовок', 'шапка'}
WORDS_ITEM_FOOTER = {'подвал'}

WORDS_POSITION_TOP = {'сверху', 'наверху', 'вверху'}
WORDS_POSITION_BOTTOM = {'снизу', 'внизу'}
WORDS_POSITION_LEFT = {'слева'}
WORDS_POSITION_RIGHT = {'справа'}


def parse_intent(context_id, text):
    if context_id not in context_data:
        context_data[context_id] = {}
    ctx = context_data[context_id]

    normalized = [morph.parse(word)[0].normal_form for word in RE_WORDS.findall(text)]
    print(normalized)

    intent = {
        'command': detect_command(normalized),
        'item': detect_item(normalized),
        'position': detect_position(normalized),
    }

    return intent


def detect_command(word_list):
    for word in word_list:
        if word in WORDS_COMMAND_CREATE:
            return 'create'


def detect_item(word_list):
    for word in word_list:
        if word in WORDS_ITEM_NAVBAR:
            return 'navbar'


def detect_position(word_list):
    for word in word_list:
        if word in WORDS_POSITION_TOP:
            return 'top'
        if word in WORDS_POSITION_BOTTOM:
            return 'bottom'
        if word in WORDS_POSITION_LEFT:
            return 'left'
        if word in WORDS_POSITION_RIGHT:
            return 'right'


def testme():
    print(parse_intent('ctx1', 'создай навигационную полосу сверху'))


if __name__ == '__main__':
    testme()
