import {store} from "rfx-core";

import NlpState from "./NlpState";
import UserState from "./UserState";
import WebsiteState from "./WebsiteState";
import TopicState from "./TopicState";
import KeywordState from "./KeywordState";
import SearchState from "./SearchState";
import SystemState from './SystemState';
import AnalysisState from './AnalysisState';
import HostState from './HostState';

export default store.setup({
    nlpState: NlpState,
    userState: UserState,
    websiteState: WebsiteState,
    topicState: TopicState,
    keywordState: KeywordState,
    searchState: SearchState,
    systemState: SystemState,
    analysisState: AnalysisState,
    hostState: HostState,
});
