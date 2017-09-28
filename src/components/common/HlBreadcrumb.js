/**
 * Created by hldev on 17-5-26.
 */
import React, {Component, PropTypes} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import createHistory from 'history/createBrowserHistory'
import {Button, Icon, Breadcrumb} from 'antd';
const ButtonGroup = Button.Group;
const history = createHistory();

@inject("store")
@observer
export default class HlBreadcrumb extends Component {
    static propTypes = {
        breadcrumb: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        const items = this.props.breadcrumb.map((item, idx) => {
            if (item.path) {
                return (<Breadcrumb.Item key={idx}><Link to={item.path}>{item.name}</Link></Breadcrumb.Item>)
            } else {
                return <Breadcrumb.Item key={idx}>{item.name}</Breadcrumb.Item>
            }
        });


        return (
            <div>
                <Breadcrumb style={{margin: '12px 0', borderBottom: '2px solid #404040'}}>
                    {items}
                </Breadcrumb>
                {/*<ButtonGroup style={{float: 'right'}}>*/}
                    {/*<Button type="primary" onClick={history.goBack}>*/}
                        {/*<Icon type="left"/>返回*/}
                    {/*</Button>*/}
                    {/*<Button type="primary" onClick={history.goForward}>*/}
                        {/*前进<Icon type="right"/>*/}
                    {/*</Button>*/}
                {/*</ButtonGroup>*/}
            </div>
        )
    }
}