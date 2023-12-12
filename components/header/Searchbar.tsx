import { headerHeight } from "$store/components/header/constants.ts";
import Searchbar, {
  Props as SearchbarProps,
} from "$store/components/search/Searchbar.tsx";
import MobileSearchbar from "$store/components/search/MobileSearchbar.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props {
  searchbar?: SearchbarProps;
  isMobile?: boolean;
}

function SearchbarModal({ searchbar, isMobile }: Props) {
  const { displaySearchPopup } = useUI();

  if (!searchbar) {
    return null;
  }

  if (isMobile) {
    return <MobileSearchbar {...searchbar} />;
  }

  return (
    <Modal
      loading="lazy"
      open={displaySearchPopup.value}
      onClose={() => displaySearchPopup.value = false}
      hasBackgroundTransparent={true}
    >
      <div
        class="absolute top-0 w-full pb-4"
        style={{ marginTop: "110px" }}
      >
        <Searchbar {...searchbar} />
      </div>
    </Modal>
  );
}

export default SearchbarModal;
