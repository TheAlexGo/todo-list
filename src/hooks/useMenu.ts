import { type FocusEvent, type KeyboardEvent, type MouseEvent, useState, useMemo } from 'react';

enum KeyboardKeys {
    Tab = 'Tab',
    Enter = 'Enter',
    Esc = 'Escape',
    Space = 'Space',
    ArrowLeft = 'ArrowLeft',
    ArrowUp = 'ArrowUp',
    ArrowRight = 'ArrowRight',
    ArrowDown = 'ArrowDown',
}

const withoutFocusProps = {
    withFocus: false,
    tabIndex: -1,
};

/**
 * Главный интерфейс элемента дополнительного меню
 */
export interface ISubMenuItemCore {
    id: string;
    title: string;
    isSelected: boolean;
}

/**
 * Главный интерфейс элемента основного меню
 */
export interface IMenuItemCore {
    id: string;
    title?: string;
    isSelected: boolean;
}

/**
 * Главный интерфейс элемента с дополнительным меню
 */
export interface IMenuItemExpandedCore<TSubMenuItem = unknown> extends IMenuItemCore {
    elements: (TSubMenuItem & ISubMenuItemCore)[];
}

/**
 * Объединяем возможные варианты меню
 */
type MenuItemCoreUnion = IMenuItemCore | IMenuItemExpandedCore;

/**
 * Вспомогательный интерфейс элемента дополнительного меню.
 * Здесь находятся все необходимые для логики свойства.
 * Можно свободно расширять.
 */
interface ISubMenuItem extends ISubMenuItemCore {
    index: number;
    tabIndex: number;
    withFocus: boolean;
    clickSubMenuItemHandler: TClickSubMenuItemCallback;
    keyDownSubMenuItemHandler: TKeyDownSubMenuItemCallback;
    focusSubMenuItemHandler: TFocusSubMenuItemCallback;
    blurSubMenuItemHandler: TBlurSubMenuItemCallback;
}

/**
 * Главный тип со всеми свойствами элемента дополнительного меню.
 * Можно расширять дженериком, как угодно.
 */
export type TSubMenuItemFull<TSubMenuItem> = ISubMenuItem & TSubMenuItem;

/**
 * Базовые свойства для элемента основного меню.
 * Здесь находятся базовые свойства для осуществляния логики.
 * Можно свободно расширять.
 */
interface IMenuItemLess extends IMenuItemCore {
    withFocus: boolean;
    tabIndex: number;
    menuItemIndex: number;
    clickMenuItemHandler: TClickMenuItemCallback;
    keyDownMenuItemHandler: TKeyDownMenuItemCallback;
    focusMenuItemHandler: TFocusMenuItemCallback;
    blurMenuItemHandler: TBlurMenuItemCallback;
}

/**
 * Главный интерфейс элемента основного меню (без дополнительного).
 * Здесь находятся все необходимые для логики свойства.
 * Можно свободно расширять.
 */
interface IMenuItem extends IMenuItemLess {}

/**
 * Главный интерфейс элемента основного меню (с дополнительным).
 * Здесь находятся все необходимые для логики свойства.
 * Можно свободно расширять.
 */
interface IMenuItemExpanded<TSubMenuItem> extends IMenuItemLess, IMenuItemExpandedCore<TSubMenuItemFull<TSubMenuItem>> {
    currentSubMenuItemIndex: number;
    'aria-haspopup': boolean;
    'aria-expanded'?: boolean;
    clickSubMenuItemHandler: TClickSubMenuItemCallback;
    keyDownSubMenuItemHandler: TKeyDownSubMenuItemCallback;
    focusSubMenuItemHandler: TFocusSubMenuItemCallback;
    blurSubMenuItemHandler: TBlurSubMenuItemCallback;
}

/**
 * Общий тип элемента основного меню (без дополнительного)
 */
export type TMenuItemSimple<TMenuItem> = IMenuItem & TMenuItem;

/**
 * Главный тип со всеми свойствами всех типов элементов основного меню (с дополнительным)
 */
export type TMenuItemExpanded<TMenuItemExpandedData, TSubMenuItem> = IMenuItemExpanded<TSubMenuItem> &
    TMenuItemExpandedData;

/**
 * Главный тип со всеми свойствами всех типов элементов основного меню.
 */
type TMenuItemFull<TMenuItem, TMenuItemExpandedData, TSubMenuItem> =
    | TMenuItemSimple<TMenuItem>
    | TMenuItemExpanded<TMenuItemExpandedData, TSubMenuItem>;

/**
 * Первые данные для формирования
 */
export type TMenuItemFirstData<TMenuItem, TMenuItemExpandedData, TSubMenuItem> =
    | (IMenuItemCore & TMenuItem)
    | (IMenuItemExpandedCore<TSubMenuItem> & TMenuItemExpandedData);

/**
 * Type Guards
 */
export const isMenuItemExpandedCore = (menuItem: MenuItemCoreUnion): menuItem is IMenuItemExpandedCore => {
    const { elements } = menuItem as IMenuItemExpandedCore;
    return elements?.length !== undefined && elements.length !== 0;
};
export const isMenuItemExpanded = <TMenuItem, TMenuItemExpandedData, TSubMenuItem>(
    menuItem: TMenuItemFull<TMenuItem, TMenuItemExpandedData, TSubMenuItem>,
): menuItem is TMenuItemExpanded<TMenuItemExpandedData, TSubMenuItem> => {
    const { elements } = menuItem as TMenuItemExpanded<TMenuItemExpandedData, TSubMenuItem>;
    return elements?.length !== undefined && elements.length !== 0;
};

/**
 * Типы для коллбеков
 */
export type TClickMenuItemCallback = (event: MouseEvent) => void;
export type TClickSubMenuItemCallback = (event: MouseEvent) => void;
export type TKeyDownMenuItemCallback = (event: KeyboardEvent) => void;
export type TKeyDownSubMenuItemCallback = (event: KeyboardEvent) => void;
export type TFocusMenuItemCallback = (event: FocusEvent) => void;
export type TFocusSubMenuItemCallback = (event: FocusEvent) => void;
export type TBlurMenuItemCallback = (event: FocusEvent) => void;
export type TBlurSubMenuItemCallback = (event: FocusEvent) => void;

/**
 * Основной интерфейс хука.
 * ---TMenuItem - внешний тип/интерфейс, расширяющий интерфейс элемента основного меню
 * ---TSubMenuItem - внешний тип/интерфейс, расширяющий интерфейс элемента дополнительного меню
 */
export interface IUseMenu<TMenuItem, TMenuItemExpandedData, TSubMenuItem> {
    menuId: string;
    items: TMenuItemFirstData<TMenuItem, TMenuItemExpandedData, TSubMenuItem>[];
    selectMenuItemHandler?: (currentMenuItem: TMenuItemFull<TMenuItem, TMenuItemExpandedData, TSubMenuItem>) => void;
    selectSubMenuItemHandler?: (currentSubMenuItem: TSubMenuItemFull<TSubMenuItem>) => void;
    /**
     * Отменить всплытие ивентов после выбора элемента меню?
     */
    preventEventAfterSelect?: boolean;
    /**
     * Установить автофокус после загрузки компонента?
     */
    withAutoFocus?: boolean;
}

/**
 * Подготавливаем данные для применения функционала.
 * Именно эти данные будут участвовать в формировании UI.
 */
const prepareAllData = <TMenuItem, TMenuItemExpandedData, TSubMenuItem>(
    items: TMenuItemFirstData<TMenuItem, TMenuItemExpandedData, TSubMenuItem>[],
    withAutoFocus = false,
): [
    TMenuItemFull<TMenuItem, TMenuItemExpandedData, TSubMenuItem>[],
    TMenuItemFull<TMenuItem, TMenuItemExpandedData, TSubMenuItem>,
    TSubMenuItemFull<TSubMenuItem> | null,
] => {
    let selectedMenuItem: TMenuItemFull<TMenuItem, TMenuItemExpandedData, TSubMenuItem> | null = null;
    let selectedSubMenuItem: TSubMenuItemFull<TSubMenuItem> | null = null;

    /**
     * Подготавливаем данные для детей выбранного элемента основного меню
     * @param subMenuItem
     * @param index
     */
    const prepareSubMenuItemData = (subMenuItem: ISubMenuItemCore, index: number): TSubMenuItemFull<TSubMenuItem> => {
        /**
         * Общие свойства
         */
        const mainProps = {
            ...subMenuItem,
            ...withoutFocusProps,
            index,
        } as TSubMenuItemFull<TSubMenuItem>;

        /**
         * Если элемент имеет флаг "выбранный" и ранее такого элемента не находили ->
         * добавляем в память
         */
        if (subMenuItem.isSelected && selectedSubMenuItem === null) {
            selectedSubMenuItem = mainProps;
        }

        return mainProps;
    };

    /**
     * Подготавливаем данные для элементов основного меню
     * @param menuItem
     * @param index
     */
    const prepareMenuItemData = (
        menuItem: IMenuItemCore,
        index: number,
    ): TMenuItemFull<TMenuItem, TMenuItemExpandedData, TSubMenuItem> => {
        /**
         * Общие свойства
         */
        const mainProps = {
            ...menuItem,
            ...withoutFocusProps,
            tabIndex: selectedMenuItem === null && menuItem.isSelected ? 0 : -1,
            menuItemIndex: index,
        } as TMenuItemFull<TMenuItem, TMenuItemExpandedData, TSubMenuItem>;

        if (isMenuItemExpandedCore(menuItem)) {
            const hasChildren = menuItem.elements.length !== 0;
            Object.assign(mainProps, {
                'aria-expanded': hasChildren ? false : undefined,
                'aria-haspopup': hasChildren,
                elements: menuItem.elements.map(prepareSubMenuItemData),
                currentSubMenuItemIndex: selectedSubMenuItem?.index || 0,
            });
        }

        /**
         * Если элемент имеет флаг "выбранный" и ранее такого элемента не находили ->
         * добавляем в память
         */
        if (selectedMenuItem === null && menuItem.isSelected) {
            if (withAutoFocus) {
                Object.assign(mainProps, {
                    withFocus: withAutoFocus,
                });
            }
            selectedMenuItem = mainProps;
        }

        return mainProps;
    };

    const preparedMenuItems = items.map(prepareMenuItemData);

    /**
     * Если так и не нашли выбранный элемент основного меню, выбираем первый из списка
     */
    if (selectedMenuItem === null) {
        Object.assign(preparedMenuItems[0], {
            tabIndex: 0,
            isSelected: true,
        });
        [selectedMenuItem] = preparedMenuItems;
    }

    return [preparedMenuItems, selectedMenuItem, selectedSubMenuItem];
};

/**
 * Хук-обвязка для формирования компонента с выпадающим меню.
 * Может работать как с одним элементом (например, самостоятельный элемент
 * с выпадающим меню), так и с целым списком объектов
 * (например, для формирования меню приложения, формирования табов и пр.)
 *
 * На вход:
 * --- menuId - уникальный идентификатор компонента;
 * --- items - список элементов, участвующие в реализации. Основные данные обязательно должны наследоваться от IMenuItemCore, а содержимое (elements) - от ISubMenuItemCore.
 * --- selectMenuItemHandler - обработчик выбора элемента из основного меню (используется, если у него нет детей);
 * --- selectSubMenuItemHandler - обработчика выбора элемента из дополнительного меню (используется, если у элемента MenuItem есть SubMenuItem);
 *
 * На выходе:
 * --- menuItems - новый список элементов с дополнительными свойствами (используются в рисовании и корректной работе UI)
 * --- clickMenuItemHandler - обработчик клика на элемент из основного меню (ака. MenuItem);
 * --- clickSubMenuItemHandler - обработчик клика на элемент из дополнительного меню (ака. SubMenuItem);
 * --- keyDownMenuItemHandler - обработчик нажатия клавиши для элемента основного меню (ака. MenuItem);
 * --- keyDownSubMenuItemHandler - обработчик нажатия клавиши для элемента из дополнительного меню (ака. SubMenuItem);
 * --- focusMenuItemHandler - обработчик фокуса на элемент основного меню (ака. MenuItem);
 * --- focusSubMenuItemHandler - обработчик фокуса на элемент дополнительного меню (ака. SubMenuItem);
 * --- blurMenuItemHandler - обработчик потери фокуса с элемента основного меню (ака. MenuItem);
 * --- blurSubMenuItemHandler - обработчик потери фокуса с элемента дополнительного меню (ака. SubMenuItem);
 *
 * @author alexander.gordeev (alexander.gordeev@vk.team)
 * @param param0
 */
export const useMenu = <
    TMenuItem = IMenuItemCore,
    TMenuItemExpandedData = IMenuItemExpandedCore,
    TSubMenuItem = ISubMenuItemCore,
>({
    menuId,
    items,
    selectMenuItemHandler,
    selectSubMenuItemHandler,
    preventEventAfterSelect = false,
    withAutoFocus = false,
}: IUseMenu<TMenuItem, TMenuItemExpandedData, TSubMenuItem>) => {
    const [preparedMenuItems, selectedMenuItem, selectedSubMenuItem] = useMemo(
        () => prepareAllData<TMenuItem, TMenuItemExpandedData, TSubMenuItem>(items, withAutoFocus),
        [items, withAutoFocus],
    );

    /**
     * Список элементов основного меню, которые имеют все нужные свойства для рендера
     */
    const [menuItems, setMenuItems] =
        useState<TMenuItemFull<TMenuItem, TMenuItemExpandedData, TSubMenuItem>[]>(preparedMenuItems);
    /**
     * Список элементов дополнительного меню
     */
    const [subMenuItems, setSubMenuItems] = useState<TSubMenuItemFull<TSubMenuItem>[]>(
        isMenuItemExpanded(selectedMenuItem) ? selectedMenuItem.elements : [],
    );
    /**
     * Активный элемент основного меню
     */
    const [activeMenuItem, setActiveMenuItem] = useState<TMenuItemFull<
        TMenuItem,
        TMenuItemExpandedData,
        TSubMenuItem
    > | null>(selectedMenuItem);
    /**
     * Активный элемент дополнительного меню
     */
    const [activeSubMenuItem, setActiveSubMenuItem] = useState<TSubMenuItemFull<TSubMenuItem> | null>(
        selectedSubMenuItem,
    );

    /**
     * Получить список свойств по-умолчанию для элемента дополнительного меню
     * @param currentItem
     */
    const getDefaultSubMenuItemProps = (
        currentItem: TSubMenuItemFull<TSubMenuItem>,
    ): TSubMenuItemFull<TSubMenuItem> => ({
        ...currentItem,
        ...withoutFocusProps,
    });

    /**
     * Получить список свойств по-умолчанию для элемента основного меню
     * @param currentItem
     */
    const getDefaultMenuItemProps = (currentItem: TMenuItemSimple<TMenuItem>): TMenuItemSimple<TMenuItem> => ({
        ...currentItem,
        ...withoutFocusProps,
    });

    const getDefaultMenuItemExpandedProps = (
        currentItem: TMenuItemExpanded<TMenuItemExpandedData, TSubMenuItem>,
    ): TMenuItemExpanded<TMenuItemExpandedData, TSubMenuItem> => ({
        ...currentItem,
        ...withoutFocusProps,
        'aria-expanded': currentItem.elements.length ? false : undefined,
        elements: currentItem.elements.map(getDefaultSubMenuItemProps),
    });

    /**
     * Сфокусироваться на элементе основного меню
     * @param currentMenuItem - элемент-кандидат основного меню
     */
    const focusMenuItem = (currentMenuItem: TMenuItemFull<TMenuItem, TMenuItemExpandedData, TSubMenuItem>) => {
        setActiveMenuItem(currentMenuItem);
        setMenuItems((prevState) =>
            prevState.map((menuItem) => {
                const mainProps = isMenuItemExpanded(menuItem)
                    ? getDefaultMenuItemExpandedProps(menuItem)
                    : getDefaultMenuItemProps(menuItem);
                return {
                    ...mainProps,
                    withFocus: menuItem.id === currentMenuItem.id,
                    tabIndex: menuItem.id === currentMenuItem.id ? 0 : -1,
                };
            }),
        );
        if (isMenuItemExpanded(currentMenuItem)) {
            setSubMenuItems(currentMenuItem.elements);
        }
    };

    /**
     * Сфокусироваться на элементе дополнительного меню
     * @param currentActiveMenuItem - выбранный элемент основного меню
     * @param currentSubMenuItem - элемент-кандидат дополнительного меню
     */
    const focusSubMenuItem = (
        currentActiveMenuItem: TMenuItemFull<TMenuItem, TMenuItemExpandedData, TSubMenuItem>,
        currentSubMenuItem: TSubMenuItemFull<TSubMenuItem>,
    ) => {
        setActiveSubMenuItem(currentSubMenuItem);
        setMenuItems((prevState) =>
            prevState.map((menuItem) => {
                if (currentActiveMenuItem.id === menuItem.id) {
                    const mainProps = {
                        ...menuItem,
                        ...withoutFocusProps,
                        'aria-expanded': true,
                    };
                    if (isMenuItemExpanded(menuItem)) {
                        Object.assign(mainProps, {
                            elements: menuItem.elements.map((subMenuItem) => ({
                                ...getDefaultSubMenuItemProps(subMenuItem),
                                withFocus: subMenuItem.id === currentSubMenuItem.id,
                                tabIndex: subMenuItem.id === currentSubMenuItem.id ? 0 : -1,
                            })),
                        });
                    }
                    return mainProps;
                }
                return menuItem;
            }),
        );
    };

    /**
     * Навигация по элементам основного меню
     * @param idx - индекс элемента-кандидата
     */
    const gotoMenuIndex = (idx: number) => {
        let index = idx;
        if (idx === menuItems.length) {
            index = 0;
        } else if (idx < 0) {
            index = menuItems.length - 1;
        }
        focusMenuItem(menuItems[index]);
    };

    /**
     * Навигация по элементам дополнительного меню
     * @param currentActiveMenuItem - выбранный элемент основного меню
     * @param idx - индекс элемента-кандидата
     */
    const gotoSubMenuIndex = (
        currentActiveMenuItem: TMenuItemFull<TMenuItem, TMenuItemExpandedData, TSubMenuItem>,
        idx: number,
    ) => {
        if (!isMenuItemExpanded(currentActiveMenuItem)) {
            return;
        }
        const { elements } = currentActiveMenuItem;
        let index = idx;
        if (elements.length === 0) {
            return;
        }
        if (idx === elements.length) {
            index = 0;
        } else if (idx < 0) {
            index = elements.length - 1;
        }

        focusSubMenuItem(currentActiveMenuItem, elements[index]);
    };

    /**
     * Обработчик клика на элемент из основного меню (ака. MenuItem)
     * @param event
     */
    const clickMenuItemHandler: TClickMenuItemCallback = (event: MouseEvent) => {
        event.preventDefault();

        const currentMenuItem = menuItems.find(({ id }) => event.currentTarget.id === id)!;
        gotoMenuIndex(currentMenuItem.menuItemIndex);
        if (isMenuItemExpanded(currentMenuItem)) {
            gotoSubMenuIndex(currentMenuItem, currentMenuItem.currentSubMenuItemIndex);
        } else {
            selectMenuItemHandler?.(currentMenuItem);
        }

        return false;
    };

    /**
     * Обработчик клика на элемент из дополнительного меню (ака. SubMenuItem)
     * @param event
     */
    const clickSubMenuItemHandler: TClickSubMenuItemCallback = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (!selectSubMenuItemHandler) {
            return true;
        }

        const currentMenuItem = subMenuItems.find(({ id }) => event.currentTarget.id === id)!;
        selectSubMenuItemHandler(currentMenuItem);
        return false;
    };

    /**
     * Jбработчик нажатия клавиши для элемента основного меню (ака. MenuItem)
     * @param event
     */
    const keyDownMenuItemHandler: TKeyDownMenuItemCallback = (event: KeyboardEvent) => {
        if (!activeMenuItem) {
            return;
        }

        let flag = false;

        switch (event.key) {
            case KeyboardKeys.ArrowRight:
                gotoMenuIndex(activeMenuItem.menuItemIndex + 1);
                flag = true;
                break;
            case KeyboardKeys.ArrowLeft:
                gotoMenuIndex(activeMenuItem.menuItemIndex - 1);
                flag = true;
                break;
            case KeyboardKeys.Enter:
                if (isMenuItemExpanded(activeMenuItem)) {
                    gotoSubMenuIndex(activeMenuItem, activeMenuItem.currentSubMenuItemIndex);
                    flag = true;
                } else {
                    selectMenuItemHandler?.(activeMenuItem);
                    flag = preventEventAfterSelect;
                }
                break;
            case KeyboardKeys.Space:
            case KeyboardKeys.ArrowDown:
                if (isMenuItemExpanded(activeMenuItem)) {
                    gotoSubMenuIndex(activeMenuItem, activeMenuItem.currentSubMenuItemIndex);
                    flag = true;
                }
                break;
            case KeyboardKeys.ArrowUp:
                if (isMenuItemExpanded(activeMenuItem)) {
                    gotoSubMenuIndex(activeMenuItem, activeMenuItem.elements.length - 1);
                    flag = true;
                }
                break;
            case KeyboardKeys.Esc:
                flag = true;
                break;
            default:
                break;
        }
        if (flag) {
            event.preventDefault();
        }
    };

    /**
     * Обработчик нажатия клавиши для элемента из дополнительного меню (ака. SubMenuItem)
     * @param event
     */
    const keyDownSubMenuItemHandler: TKeyDownSubMenuItemCallback = (event: KeyboardEvent) => {
        if (!activeMenuItem || !activeSubMenuItem) {
            return true;
        }
        let flag = false;
        let flagFromSelect = false;
        switch (event.key) {
            case KeyboardKeys.Tab:
                if (event.shiftKey) {
                    gotoMenuIndex(activeMenuItem.menuItemIndex - 1);
                } else {
                    gotoMenuIndex(activeMenuItem.menuItemIndex + 1);
                }
                flag = true;
                break;
            case KeyboardKeys.ArrowRight:
                gotoMenuIndex(activeMenuItem.menuItemIndex + 1);
                flag = true;
                break;
            case KeyboardKeys.ArrowLeft:
                gotoMenuIndex(activeMenuItem.menuItemIndex - 1);
                flag = true;
                break;
            case KeyboardKeys.Esc:
                gotoMenuIndex(activeMenuItem.menuItemIndex);
                flag = true;
                break;
            case KeyboardKeys.ArrowDown:
                gotoSubMenuIndex(activeMenuItem, activeSubMenuItem.index + 1);
                flag = true;
                break;
            case KeyboardKeys.ArrowUp:
                gotoSubMenuIndex(activeMenuItem, activeSubMenuItem.index - 1);
                flag = true;
                break;
            case KeyboardKeys.Enter:
            case KeyboardKeys.Space:
                if (activeSubMenuItem) {
                    selectSubMenuItemHandler?.(activeSubMenuItem);
                    flagFromSelect = !preventEventAfterSelect;
                    flag = true;
                }
                break;
            default:
                break;
        }

        if (flagFromSelect) {
            event.stopPropagation();
            return false;
        }

        if (flag) {
            event.preventDefault();
            event.stopPropagation();
        }
        return false;
    };

    /**
     * Обработчик фокуса на элемент основного меню (ака. MenuItem)
     * @param event
     */
    const focusMenuItemHandler: TFocusMenuItemCallback = (event: FocusEvent) => {
        if (!activeMenuItem) {
            return;
        }
        const currentMenuItem = menuItems.find(({ id }) => event.currentTarget.id === id)!;
        if (activeMenuItem.menuItemIndex !== currentMenuItem.menuItemIndex) {
            gotoMenuIndex(currentMenuItem.menuItemIndex);
        }
    };

    /**
     * Обработчик фокуса на элемент дополнительного меню (ака. SubMenuItem)
     * @param event
     */
    const focusSubMenuItemHandler: TFocusSubMenuItemCallback = (event: FocusEvent) => {
        if (!activeMenuItem || !activeSubMenuItem) {
            return;
        }
        const currentSubMenuItem = subMenuItems.find(({ id }) => event.currentTarget.id === id)!;

        if (activeSubMenuItem.index !== currentSubMenuItem.index) {
            gotoSubMenuIndex(activeMenuItem, currentSubMenuItem.index);
        }
    };

    /**
     * Обработчик потери фокуса с элемента основного меню (ака. MenuItem)
     * @param event
     */
    const blurMenuItemHandler: TBlurMenuItemCallback = (event: FocusEvent) => {
        if (event.relatedTarget === null || !event.relatedTarget.closest(`#${menuId}`)) {
            setMenuItems((prevState) =>
                prevState.map((menuItem) => {
                    const mainProps = isMenuItemExpanded(menuItem)
                        ? getDefaultMenuItemExpandedProps(menuItem)
                        : getDefaultMenuItemProps(menuItem);
                    return {
                        ...mainProps,
                        tabIndex: menuItem.isSelected ? 0 : -1,
                    };
                }),
            );
        }
    };

    /**
     * Обработчик фокуса на элемент дополнительного меню (ака. SubMenuItem)
     * @param event
     */
    const blurSubMenuItemHandler: TBlurSubMenuItemCallback = (event: FocusEvent) => {
        if (event.relatedTarget === null || !event.relatedTarget.closest(`#${menuId}`)) {
            setSubMenuItems((prevState) => prevState.map((menuItem) => getDefaultSubMenuItemProps(menuItem)));
        }
    };

    return {
        menuItems,
        clickMenuItemHandler,
        keyDownMenuItemHandler,
        clickSubMenuItemHandler,
        keyDownSubMenuItemHandler,
        focusMenuItemHandler,
        focusSubMenuItemHandler,
        blurMenuItemHandler,
        blurSubMenuItemHandler,
    };
};
