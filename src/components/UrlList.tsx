import { Tag } from "antd";
import { PagesService } from "../../services/pages.service";
interface IOwnProps {
  pageList: string[];
}

export function UrlList(props: IOwnProps) {
  const onRemoveTag = (page: string) => {
		console.log("page removed: ", page);
    PagesService.removePage(page);
  };
  return (
    <div>
      {props.pageList.map((page) => (
        <Tag color="cyan" closable onClose={() => onRemoveTag(page)}>
          {page}
        </Tag>
      ))}
    </div>
  );
}
