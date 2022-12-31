import NestedCommentsCell from "../NestedCommentsCell/NestedCommentsCell"


const NestedComment = ({parentId}) => {
  return (
    <>
      <NestedCommentsCell id={parentId}/>
    </>
  )
}

export default NestedComment
