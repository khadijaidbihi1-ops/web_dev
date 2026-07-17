const grid = document.querySelector("#grid");
const count = document.querySelector("#count");
const empty = document.querySelector("#empty");

const search = document.querySelector("#search");
const collection = document.querySelector("#collection");
const gender = document.querySelector("#gender");
const sort = document.querySelector("#sort");

const tabs = [...document.querySelectorAll("[data-type]")];
const params = new URLSearchParams(window.location.search);

let type = params.get("type") || "all";

collection.value = params.get("collection") || "all";

const placeholder = (name) => {
    return `https://placehold.co/700x850/f3efe8/222?text=${encodeURIComponent(name)}`;
};

function matchesType(product) {
    if (type === "all") {
        return true;
    }

    if (type === "home-fragrance") {
        return [
            "room-spray",
            "reed-diffuser",
            "scented-candle"
        ].includes(product.type);
    }

    return product.type === type;
}

function render() {
    gender.hidden = type !== "perfume";

    tabs.forEach((button) => {
        button.classList.toggle(
            "active",
            button.dataset.type === type
        );
    });

    let list = window.PRODUCTS.filter((product) => {
        const matchesSelectedType = matchesType(product);

        const matchesCollection =
            collection.value === "all" ||
            product.collection === collection.value;

        const matchesGender =
            type !== "perfume" ||
            gender.value === "all" ||
            product.gender === gender.value;

        const searchText =
            `${product.name} ${product.collection} ${product.type}`
                .toLowerCase();

        const matchesSearch = searchText.includes(
            search.value.toLowerCase().trim()
        );

        return (
            matchesSelectedType &&
            matchesCollection &&
            matchesGender &&
            matchesSearch
        );
    });

    if (sort.value === "low") {
        list.sort((a, b) => a.price - b.price);
    }

    if (sort.value === "high") {
        list.sort((a, b) => b.price - a.price);
    }

    if (sort.value === "az") {
        list.sort((a, b) => a.name.localeCompare(b.name));
    }

    count.textContent = list.length;
    empty.hidden = list.length !== 0;

    grid.innerHTML = list
        .map((product) => {
            return `
                <article class="card">

                    <a
                        class="image"
                        href="product.html?product=${product.slug}"
                        aria-label="View ${product.name}"
                    >
                        <img
                            src="${product.images[0]}"
                            alt="${product.name}"
                            onerror="this.onerror=null; this.src='${placeholder(product.name)}'"
                        >
                    </a>

                    <p class="eyebrow">
                        ${product.collection}
                    </p>

                    <h2>
                        <a href="product.html?product=${product.slug}">
                            ${product.name}
                        </a>
                    </h2>

                    <p class="muted">
                        ${product.type.replaceAll("-", " ")} · ${product.size}
                    </p>

                    <b>£${product.price}</b>

                </article>
            `;
        })
        .join("");

    updatePageTitle();
}

function updatePageTitle() {
    const pageTitle = document.querySelector("#page-title");

    if (collection.value !== "all") {
        pageTitle.textContent =
            `${capitalize(collection.value)} Collection`;

        return;
    }

    if (type === "all") {
        pageTitle.textContent = "Shop All Products";

        return;
    }

    if (type === "home-fragrance") {
        pageTitle.textContent = "Home Fragrance";

        return;
    }

    const activeTab = tabs.find((button) => {
        return button.dataset.type === type;
    });

    pageTitle.textContent = activeTab
        ? activeTab.textContent
        : "Shop Products";
}

function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

tabs.forEach((button) => {
    button.addEventListener("click", () => {
        type = button.dataset.type;

        if (type !== "perfume") {
            gender.value = "all";
        }

        render();
    });
});

search.addEventListener("input", render);
collection.addEventListener("change", render);
gender.addEventListener("change", render);
sort.addEventListener("change", render);

document.querySelector("#clear").addEventListener("click", () => {
    type = "all";
    search.value = "";
    collection.value = "all";
    gender.value = "all";
    sort.value = "featured";

    render();
});

render();