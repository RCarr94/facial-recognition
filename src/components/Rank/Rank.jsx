

export default function Rank({ userName, userEntries }) {
  return (
    <div>
      <div className="white f3">
        {`${userName}, your current entry count is...`}
      </div>
      <div className="white f1">
        {userEntries}
      </div>
    </div>
  );
}