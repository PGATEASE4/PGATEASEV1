@@ .. @@
   const addProperty = useCallback((newProperty) => {
     setProperties(prev => [...prev, newProperty]);
   }, []);
 
+  // Make addProperty available globally for the add-property page
+  useEffect(() => {
+    if (typeof window !== 'undefined') {
+      window.addProperty = addProperty;
+    }
+    return () => {
+      if (typeof window !== 'undefined') {
+        delete window.addProperty;
+      }
+    };
+  }, [addProperty]);
+
   // Save to localStorage when properties change
   useEffect(() => {
     if (isLoaded) {