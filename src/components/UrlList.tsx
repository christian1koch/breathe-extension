import { Tag } from "antd";
import { PagesService } from "../../services/pages.service";
interface IOwnProps {
  pageList: string[];
  onRemoveTag: (page: string) => void;
}

export function UrlList(props: IOwnProps) {
  const onRemoveTag = (page: string) => {
    props.onRemoveTag(page);
    console.log("page removed: ", page);
    PagesService.removePage(page);
  };
  return (
    <div>
      {props.pageList.map((page) => (
        <Tag
          className="tags"
          color="cyan"
          closable
          onClose={() => onRemoveTag(page)}
        >
          {page}
        </Tag>
      ))}
    </div>
  );
}
