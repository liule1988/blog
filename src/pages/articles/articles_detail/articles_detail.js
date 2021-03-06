/**
 * Created by Administrator on 2017/11/3.
 */
import React, {Component} from 'react';
import {action_articles_data} from '../../../redux/action/article'
import {connect} from 'react-redux'
import axios from 'axios'
import './articles_detail.scss'
import '../markdown.scss'
import ReactMarkdown from 'react-markdown'
class A_Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: {}
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        let article_id = this.props.match.params.id;
        let url = "https://api.github.com/repositories/69333276/issues/" + article_id
        axios.get(url,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3.html',
                }
            }
        ).then(res => {
            console.log(res)
            this.setState({
                content: res.data
            })
        })

    }

    render() {
        return (
            <div className="article-detail">
                <div className="detail-banner">
                    <div className="detail-banner-container">
                        <h1>{this.state.content.title}</h1>
                    </div>
                </div>

                <div className="le-container">
                    <div className="detail-body">
                        {this.state.content.body_html && <ReactMarkdown className="markdown-body" source={this.state.content.body_html}/>}
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        articles: state.articles
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onChangeArticles: (data) => {
            dispatch(action_articles_data(data))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(A_Detail);