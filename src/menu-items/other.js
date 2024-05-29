// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconHelp, IconSitemap } from '@tabler/icons-react';

// constant
const icons = {
    IconHelp,
    IconSitemap
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    icon: icons.IconHelp,
    type: 'group',
    children: [
        {
            id: 'documentation',
            title: <FormattedMessage id="documentation" />,
            type: 'item',
            url: 'https://codedthemes.gitbook.io/berry/',
            icon: icons.IconHelp,
            external: true,
            target: true
        },
        {
            id: 'roadmap',
            title: <FormattedMessage id="roadmap" />,
            type: 'item',
            url: 'https://codedthemes.gitbook.io/berry/roadmap',
            icon: icons.IconSitemap,
            external: true,
            target: true
        }
    ]
};

export default other;
