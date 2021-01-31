import React, { useState } from "react"
import rangeParser from "parse-numeric-range"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import Highlight, { defaultProps } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/nightOwl"
import Title from "./title";
import Button from "./Button";


const getParams = (className = ``) => {
  const [lang = ``, params = ``] = className.split(`:`)
  return [lang.split(`language-`).pop().split(`{`).shift()].concat(
    params.split(`&`).reduce((merged, param) => {
      const [key, value] = param.split(`=`)
      merged[key] = value
      return merged
    }, {})
  )
}

export default ({ children, className, metastring, codeString, ...props }) => {
  const [isCopied, setIsCopied] = useState(false);
  // const language = className.replace(/language-/, "") || "";

  // const className = props.children.props.className || "";
  const [language, { title = `` }] = getParams(className)
  // const ifTitle = (title || language) && { marginTop: `0px`, borderTopLeftRadius: '0px', borderTopRightRadius: '0px' };
  const ifTitle = title && { marginTop: `0px`, borderTopLeftRadius: '0px', borderTopRightRadius: '0px' };

  const calculateLinesToHighlight = (meta) => {
    const RE = /{([\d,-]+)}/
    if (RE.test(meta)) {
      const strlineNumbers = RE.exec(meta)[1]
      const lineNumbers = rangeParser(strlineNumbers)
      return (index) => lineNumbers.includes(index + 1)
    } else {
      return () => false
    }
  }

  const shouldHighlightLine = calculateLinesToHighlight(metastring);

  const copyToClipboard = (str) => {
    const el = document.createElement("textarea")
    el.value = str
    el.setAttribute("readonly", "")
    el.style.position = "absolute"
    el.style.left = "-9999px"
    document.body.appendChild(el)
    el.select()
    document.execCommand("copy")
    document.body.removeChild(el)
  } 

  if (props["react-live"]) {
    return (
      <LiveProvider code={codeString} noInline={true}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    )
  } else {
  return (
    <Highlight
      {...defaultProps}
      // code={children}
      code={codeString}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <>
          {title ? (
            <Title className="code-title" text={title}>
              {language}
            </Title>
          ) : null}
          <pre
            className={className}
            style={{ ...style, ...ifTitle, position: "relative" }}
          >
             <Button
              onClick={() => {
                copyToClipboard(codeString)
                setIsCopied(true)
                setTimeout(() => setIsCopied(false), 3000)
              }}
              ifTitle={ifTitle}
            >
              {isCopied ? "🎉 Copied!" : "Copy"}
            </Button>

            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i })
              if (shouldHighlightLine(i)) {
                lineProps.className = `${lineProps.className} highlight-line`
              }
              return (
                <div key={i} {...lineProps}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              )
            })}
          </pre>
        </>
      )}
    </Highlight>
  )}
}
