

export const ItemsCheckoutList = ({ id, name, price, count }) => {
  return (
    <main className="w-full flex gap-2 justify-between">
      <p className="text-lg">{name}</p>
      {count > 1 ? <span className="text-lg">x{count}</span> : ""}
      <p className="text-lg font-semibold">${price * count}</p>
    </main>
  );
};
