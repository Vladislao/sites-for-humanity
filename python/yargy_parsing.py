from yargy import Parser, rule, or_
from yargy.predicates import dictionary, normalized, gram
from yargy.interpretation import fact
from yargy.pipelines import morph_pipeline

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

    'справа от': 'toright',
    'справа': 'toright',
}

RELEVANCY = morph_pipeline(
    list(RELEVANCY_KEYWORDS.keys())
).interpretation(
    Relevancy.relevancy.normalized().custom(RELEVANCY_KEYWORDS.__getitem__)
)

ITEM_KEYWORDS = {
    'навигационный меню': 'navbar',
    'меню': 'navbar',
    'заголовок': 'header',
    'шапка': 'header',
    'подвал': 'footer',
    'блок': 'block',
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
    'зеленый': 'green',
    'синий': 'blue',
    'фиолетовый': 'violet',
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
    'создать': 'create',
    'добавить': 'create',
    'удалить': 'delete',
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

# test
for text in TEST_CASES_2:
    print('-')
    print(text)
    for match in parser.findall(text):
        print([_.value for _ in match.tokens])
        print(match.fact)


def parse(text):
    result = []
    for match in parser.findall(text):
        f = match.fact
        result.append({
            'command': f.command,
            'item': f.item,
            'position': {
                'rele': f.position.relevancy,
                'item': f.position.item,
            },
            'color': f.color,
        })
    return result


# for text in TEST_CASES_2:
#     print('-')
#     print(text)
#     print(parse(text))
