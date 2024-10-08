import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import { useTranslation } from "react-i18next";

export default function Search() {
  const navigate = useNavigate();
  // States
  const [sidebarData, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [t] = useTranslation("global");

  //useEffect function
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }
    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  //Handle Change function
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebarData, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebarData, searchTerm: e.target.value });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebarData, sort, order });
    }
  };

  //Handle Submite function
  const handleSubmite = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  //ShowMoreClick function
  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmite} className="flex flex-col gap-8">
          <div className="flex   items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              {t("search.search term")}:
            </label>
            <TextInput
              placeholder={t("header.search")}
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Label className="font-semibold" htmlFor="remember">
              {t("search.type")}:
            </Label>
            <div className="flex gap-2 items-center">
              <Checkbox
                id="all"
                onChange={handleChange}
                checked={sidebarData.type === "all"}
              />
              <span>{t("search.rent & sale")}</span>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox
                id="rent"
                onChange={handleChange}
                checked={sidebarData.type === "rent"}
              />
              <span>{t("search.rent")}</span>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox
                id="sale"
                onChange={handleChange}
                checked={sidebarData.type === "sale"}
              />
              <span>{t("search.sale")}</span>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox
                id="offer"
                onChange={handleChange}
                checked={sidebarData.offer}
              />
              <span>{t("search.offer")}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Label className="font-semibold" htmlFor="remember">
              {t("search.amenities")}:
            </Label>
            <div className="flex gap-2 items-center">
              <Checkbox
                id="parking"
                onChange={handleChange}
                checked={sidebarData.parking}
              />
              <span>{t("search.parking")}</span>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox
                id="furnished"
                onChange={handleChange}
                checked={sidebarData.furnished}
              />
              <span>{t("search.furnished")}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">{t("search.sort")}:</label>
            <Select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
            >
              <option value="regularPrice_desc">{t("search.h-l")}</option>
              <option value="regularPrice_asc">{t("search.l-h")}</option>
              <option value="createdAt_desc">{t("search.latest")}</option>
              <option value="createdAt_asc">{t("search.oldest")}</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">
            {t("header.search")}
          </Button>
        </form>
      </div>
      <div className="w-full flex-1">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 ">
          {t("search.listing results")}:
        </h1>

        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">
              {t("search.no listing found")}
            </p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              {t("search.loading")}
            </p>
          )}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              {t("search.show more")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
