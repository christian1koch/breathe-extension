import { Tag } from "antd";
import { PagesService } from "../../services/pages.service";
interface IOwnProps {
  pageList: string[];
  onRemoveTag: (page: string) => void;
}

export function UrlList(props: IOwnProps) {
  const onRemoveTag = async (page: string) => {
		console.log("page removed: ", page);
    await PagesService.removePage(page);
    props.onRemoveTag(page);
  };
  return (
    <div>
      {props.pageList.map((page) => (
				<Tag
				className="tags"
				color="cyan"
				closable
				onClose={(e) => {
					// in order to prevent the page from being removed when clicking on the tag
					// removal should be internally handle by the parent component that handles the pageList
					e.preventDefault();
					onRemoveTag(page)
				}}
        >
					
          {page}
        </Tag>
      ))}
			{props.pageList.toString()}
    </div>
  );
}
