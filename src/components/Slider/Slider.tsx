import React, { type HTMLAttributes, type JSX } from 'react';

import cn from 'classnames';

import { Loader, LoaderPositions, LoaderSizes } from '@components/Loader/Loader';
import { RoutingLink } from '@components/RoutingLink/RoutingLink';

import classes from './Slider.module.scss';

interface ISliderItemCore {
    id: string | number;
}

type TScrollItem<TItem> = TItem & ISliderItemCore;

interface ISlider<TItem extends ISliderItemCore> {
    heading: string;
    isInvisibleHeading?: boolean;
    items: TItem[];
    renderItem: (item: TItem) => JSX.Element;
    itemClassName?: string;
    moreLink?: {
        title: string;
        href: string;
    };
    axis?: 'x' | 'y';
}

type SliderProps<TItem> = ISlider<TScrollItem<TItem>> & Omit<HTMLAttributes<HTMLUListElement>, 'children'>;

export function Slider<TItem>({
    heading,
    isInvisibleHeading = false,
    moreLink,
    items,
    renderItem,
    itemClassName,
    className,
    axis = 'x',
    ...props
}: SliderProps<TItem>): JSX.Element {
    const rootClasses = cn(
        classes.slider,
        {
            [classes[`__is-axis_${axis}`]]: axis,
        },
        className,
    );
    const headerClasses = cn(classes.header, {
        [classes['__is-invisible']]: isInvisibleHeading,
    });
    const itemClasses = cn(classes.item, itemClassName);

    return (
        <div>
            <div className={headerClasses}>
                <h2 className={classes.heading}>{heading}</h2>
                {moreLink && (
                    <RoutingLink to={moreLink.href} className={classes['more-link']}>
                        {moreLink.title}
                    </RoutingLink>
                )}
            </div>
            {items.length === 0 && <Loader size={LoaderSizes.L} position={LoaderPositions.STATIC_ON_CENTER} />}
            <ul {...props} className={rootClasses}>
                {items.map((item) => (
                    <li key={item.id} className={itemClasses}>
                        {renderItem(item)}
                    </li>
                ))}
            </ul>
        </div>
    );
}
