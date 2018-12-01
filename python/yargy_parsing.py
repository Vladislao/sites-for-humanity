from yargy import Parser, rule, or_
from yargy.predicates import dictionary, normalized, gram
from yargy.interpretation import fact
from yargy.pipelines import morph_pipeline

import re
import pymorphy2

import images

RE_WORDS = re.compile(r'[а-яА-Яa-zA-Z0-9]+')
morph = pymorphy2.MorphAnalyzer()


context = {
    'edit_in': 'none'
}


Relevancy = fact(
    'Relevancy',
    ['relevancy', 'item']
)

Command = fact(
    'Command',
    ['command', 'item', 'position', 'color']
)

RELEVANCY_KEYWORDS = {
    'наверху': 'totop',
    'сверху': 'totop',
    'сверху от': 'totop',
    'над': 'totop',

    'внизу': 'tobottom',
    'снизу': 'tobottom',
    'снизу от': 'tobottom',
    'под': 'tobottom',

    'слева от': 'toleft',
    'слева': 'toleft',
    'лево': 'toleft',

    'справа от': 'toright',
    'справа': 'toright',
    'право': 'toright',
    'с про': 'toright',
    'спра': 'toright',

    'в': 'in',
    'из': 'in',
}

RELEVANCY = morph_pipeline(
    list(RELEVANCY_KEYWORDS.keys())
).interpretation(
    Relevancy.relevancy.normalized().custom(RELEVANCY_KEYWORDS.__getitem__)
)

ITEM_KEYWORDS = {
    'навигационный меню': 'navbar',
    'боковой меню': 'navbar',
    'меню': 'navbar',
    'под меню': 'menuitem',
    'пункт меню': 'menuitem',
    'пункт': 'menuitem',
    'заголовок': 'header',
    'шапка': 'header',
    'подвал': 'footer',
    'блок': 'text',
    'блок с текст': 'text',
    'текстовый блок': 'text',
    'логотип': 'logo',
    'картинка': 'image',
    'картинка на фон': 'image',
    'текст': 'text',
    'абзац с текст': 'text',
    'кнопка с текст': 'button',
    'кнопка': 'button',
    'ссылка с текст': 'href',
    'ссылка': 'href',
    'контент': 'content',
    'тело': 'content',
    'основной секция': 'content',
}

ITEM = morph_pipeline(
    list(ITEM_KEYWORDS.keys())
)

POSITION = or_(
    rule(
        RELEVANCY,
        ITEM.interpretation(
            Relevancy.item.normalized().custom(ITEM_KEYWORDS.__getitem__)
        )
    ),
    RELEVANCY,
).interpretation(Relevancy)

COLOR_KEYWORDS = {
    'красный': 'red',
    'желтый': 'yellow',
    'оранжевый': 'orange',
    'лаймовый': 'lime',
    'зеленый': 'green',
    'синий': 'blue',
    'голубой': 'deepskyblue',
    'фиолетовый': 'purple',
    'белый': 'white',
    'черный': 'black',
    'серый': 'gray',
}

COLOR = gram('ADJF').interpretation(Command.color.normalized())

USE_COLOR = or_(
    rule(COLOR, normalized('цвета')),
    rule(normalized('цвета'), COLOR),
    COLOR,
)

COMMAND_KEYWORDS = {
    'редактировать': 'edit',
    'редактирование': 'edit',
    'поменять': 'update',
    'создать': 'create',
    'добавить': 'create',
    'удалить': 'delete',
    'убавить': 'delete',
    'убавь': 'delete',
    'удаль': 'delete',
    'убрать': 'delete',
    'перенести': 'move',
}

COMMAND_WORD = dictionary(COMMAND_KEYWORDS).interpretation(
    Command.command.normalized().custom(COMMAND_KEYWORDS.__getitem__)
)

COMMAND_OPTIONS = or_(
    ITEM.interpretation(
        Command.item.normalized().custom(ITEM_KEYWORDS.__getitem__)
    ),
    USE_COLOR,
    POSITION.interpretation(
        Command.position
    )
)

COMMAND = rule(
    COMMAND_WORD,
    COMMAND_OPTIONS.optional().repeatable()
).interpretation(Command)

parser = Parser(COMMAND)

TEST_CASES_1 = [
    'создай навигационное меню сверху от шапки и добавь в него меню файл',
    'создай навигационное меню сверху',
    'создай шапку и добавь под шапкой навигационное меню',
    'перенеси шапку наверх',
    'удали заголовок',
]

TEST_CASES_2 = [
    'создай меню синего цвета под шапкой',
    'создай меню под шапкой красного цвета',
    'создай под шапкой меню красного цвета',
    'создай под шапкой меню',
]

TEST_CASES_3 = [
    'добавь кнопку с текстом сохранить',
    'добавь пункт меню о компании',
    'добавь текст я хожу гуляю по москве',
]

for text in TEST_CASES_3:
    print('-')
    print(text)
    for match in parser.findall(text):
        print([_.value for _ in match.tokens])
        print(match.fact)


def find_free_text(text):
    print(text)
    original = [word for word in RE_WORDS.findall(text)]
    normalized = [morph.parse(word.lower())[0].normal_form for word in original]

    print(normalized)
    try:
        i1 = normalized.index('меню')
    except ValueError:
        i1 = -1

    try:
        i2 = normalized.index('текст')
    except ValueError:
        i2 = -1

    try:
        i3 = normalized.index('кнопка')
    except ValueError:
        i3 = -1

    try:
        i4 = normalized.index('ссылка')
    except ValueError:
        i4 = -1

    try:
        i5 = normalized.index('пункт')
    except ValueError:
        i5 = -1

    try:
        i6 = normalized.index('картинка')
    except ValueError:
        i6 = -1

    try:
        i7 = normalized.index('шрифт')
    except ValueError:
        i7 = -1

    i = max(i1, i2, i3, i4, i5, i6, i7)
    if i > 0:
        return ' '.join(original[i + 1:])
    else:
        return None


def parse(text):
    result = []
    for match in parser.findall(text):
        f = match.fact
        r = {
            'command': f.command,
            'item': f.item,
        }

        if f.command == 'edit':
            context['edit_in'] = f.position.item

        props = {}

        if f.color is not None:
            if f.color in COLOR_KEYWORDS:
                props['color'] = COLOR_KEYWORDS[f.color]

        if f.position is not None:
            if f.position.relevancy == 'in':
                result.append({
                    'command': 'edit',
                    'item': f.position.item,
                })
                context['edit_in'] = f.position.item
            else:
                props['position'] = {
                    'rele': f.position.relevancy,
                    'item': f.position.item,
                }

        t = find_free_text(text)
        if t is not None and len(t) > 0 and f.command != 'edit':
            props['freetext'] = t

        if f.command == 'create' and f.item == 'image' and 'freetext' in props:
            props['url'] = images.isearch(t)

        r['props'] = props

        result.append(r)
    return result


for text in TEST_CASES_3:
    print('-')
    print(text)
    print(parse(text))
