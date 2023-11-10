import { useCallback, useState } from "react";
import { RefreshControl } from "../../components/refresh-control";
import { Screen } from "../../components/screen";
import { View } from "../../components/view";
import { Text } from "@/components/text";

const TabOneScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    setIsRefreshing(false);
  }, [, setIsRefreshing]);

  return (
    <Screen
      variant="scroll"
      ScrollViewProps={{
        refreshControl: (
          <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
        ),
      }}
    >
      <View
        sx={{
          width: 300,
        }}
      >
        <Text text="hello world" />
      </View>
    </Screen>
  );
};

export default TabOneScreen;
