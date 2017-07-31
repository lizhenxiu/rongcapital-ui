import { configure } from '@storybook/react';

function loadStories () {
    require('../stories/core/view.story.js');
    require('../stories/core/collectionView.story.js');
    require('../stories/core/gridView.story.js');
    require('../stories/core/listView.story.js');
    require('../stories/core/navigationView.story.js');
    require('../stories/core/scrollView.story.js');

    require('../stories/base/breadcrumbs.story.js');
    require('../stories/base/actionBar.story.js');
    require('../stories/base/snakeBar.story.js');
    require('../stories/base/slider.story.js');
    // You can require as many stories as you need.
}

configure(loadStories, module);
