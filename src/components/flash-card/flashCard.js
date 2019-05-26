import React from "react"
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import rehypeReact from "rehype-react"

const splitAST = (ast) => {
    let answerFound = false
    const question = []
    const answer = []
    
    ast.children.forEach(f => {
        if(f.tagName === 'h2' && f.children[0].value === 'Answer') {
            answerFound = true;
        }

        if(!answerFound) 
            question.push(f)
        else
            answer.push(f)       
    })

    return {
        question: {...ast, children: question},
        answer: {...ast, children: answer}
    }
}

const renderAst = new rehypeReact({
    createElement: React.createElement,
  }).Compiler

const CardAST = (props) => {
    const {question, answer} = splitAST(props.ast)
    
    return (<Card question={renderAst(question)} answer={renderAst(answer)} />)
}


const Card = (props) => 
    <Flippy
        flipOnHover={false}
        flipOnClick={true}
        flipDirection="horizontal"
        style={{ width: '80%', height: '300px', textAlign: 'center', marginTop: '20px' }}
  >
    <FrontSide
      style={{
        backgroundColor: '#f0f0f0',
        borderRadius: '20px',
        textAlign: 'center'
      }}>
        {props.question}
    </FrontSide>
    
    <BackSide
      style={{ 
          backgroundColor: '#f7ffc7',
          borderRadius: '20px',
          textAlign: 'center',
          overflow: 'auto'
      }}>
      {props.answer}
    </BackSide>

  </Flippy>

export default CardAST;