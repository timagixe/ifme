// @flow
import React from 'react';
import { I18n } from 'libs/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencilAlt,
  faTrash,
  faLock,
  faDoorOpen,
  faDoorClosed,
  faExclamationTriangle,
  faCalendarPlus,
  faCalendarMinus,
} from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'components/Tooltip';
import css from './Story.scss';

export type Action = {
  name: string,
  link?: string,
  dataMethod?: string,
  dataConfirm?: string,
  onClick?: Function,
};

export type Actions = {
  edit?: Action,
  delete?: Action,
  join?: Action,
  leave?: Action,
  report?: Action,
  add_to_google_cal?: Action,
  remove_from_google_cal?: Action,
  viewers?: string,
};

export type Props = {
  actions: Actions,
  hasStory?: boolean,
  dark?: boolean,
};

const EDIT = 'edit';
const DELETE = 'delete';
const JOIN = 'join';
const LEAVE = 'leave';
const REPORT = 'report';
const VIEWERS = 'viewers';
const ADD_TO_G_CAL = 'add_to_google_cal';
const REMOVE_FROM_G_CAL = 'remove_from_google_cal';

const classMap = (dark: ?boolean) => {
  const className = dark ? css.actionDark : css.action;
  return {
    edit: <FontAwesomeIcon icon={faPencilAlt} className={className} />,
    delete: <FontAwesomeIcon icon={faTrash} className={className} />,
    join: <FontAwesomeIcon icon={faDoorOpen} className={className} />,
    leave: <FontAwesomeIcon icon={faDoorClosed} className={className} />,
    report: (
      <FontAwesomeIcon icon={faExclamationTriangle} className={className} />
    ),
    viewers: (
      <FontAwesomeIcon
        icon={faLock}
        className={className}
        tabIndex={0}
        aria-label={I18n.t('shared.viewers.plural')}
      />
    ),
    add_to_google_cal: (
      <FontAwesomeIcon icon={faCalendarPlus} className={className} />
    ),
    remove_from_google_cal: (
      <FontAwesomeIcon icon={faCalendarMinus} className={className} />
    ),
  };
};

const displayViewers = (
  actions: Actions,
  item: string,
  hasStory: ?boolean,
  dark: ?boolean,
) => (
  <div key={item} className="storyActionsViewers">
    <Tooltip
      className="storyActionsViewer"
      element={classMap(dark)[item]}
      text={actions[item]}
      right={!!hasStory}
    />
  </div>
);

const titleItem = (item: string) => item.charAt(0).toUpperCase() + item.slice(1);

const tooltipElement = (item: string, actions: Actions, dark: ?boolean) => {
  const {
    link, dataMethod, dataConfirm, name, onClick,
  } = actions[item];
  return (
    <a
      href={link}
      data-method={dataMethod}
      data-confirm={dataConfirm}
      aria-label={name}
      onClick={
        onClick
          ? (e: SyntheticEvent<HTMLInputElement>) => onClick(e, link)
          : undefined
      }
    >
      {classMap(dark)[item]}
    </a>
  );
};

const displayLink = (
  actions: Actions,
  item: string,
  hasStory: ?boolean,
  dark: ?boolean,
) => (
  <div key={item} className={`storyActions${titleItem(item)}`}>
    <Tooltip
      element={tooltipElement(item, actions, dark)}
      text={actions[item].name}
      right={!!hasStory}
    />
  </div>
);

const displayItem = (
  actions: Actions,
  item: string,
  hasStory: ?boolean,
  dark: ?boolean,
) => {
  if (item === VIEWERS) return displayViewers(actions, item, hasStory, dark);
  return displayLink(actions, item, hasStory, dark);
};

export const StoryActions = (props: Props) => {
  const { actions, hasStory, dark } = props;
  return (
    <div className={css.actions}>
      {[
        JOIN,
        ADD_TO_G_CAL,
        REMOVE_FROM_G_CAL,
        EDIT,
        LEAVE,
        DELETE,
        REPORT,
        VIEWERS,
      ].map((item: string) => (actions[item] ? displayItem(actions, item, hasStory, dark) : null))}
    </div>
  );
};
